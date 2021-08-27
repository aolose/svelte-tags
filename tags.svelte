<script>
    import {onDestroy, tick} from "svelte";
    import {post, tags} from "$lib/store";

    let ts = []
    let pr = ""
    let idx = 0
    let ipt
    let cp
    let v = ''
    let x
    let y
    let sl
    let w
    let db = []

    onDestroy(post.subscribe(({tags = ""}) => ts = tags.split(" ").filter(a => a)))

    function pos() {
        if (!ipt) return
        setTimeout(() => {
            x = ipt.offsetLeft
            y = ipt.offsetTop
        }, 30)
    }

    function change() {
        post.set({...$post, tags: ts.join(" ")})
    }

    async function ps(en) {
        en.preventDefault()
        let {value, selectionEnd: e, selectionStart: s} = this;
        const lf = value.length - e;
        const da = (en.clipboardData.getData('text') || "")
            .replace(/[,;，；、\n ]+/g, ' ').replace(/ +/g, ' ')
        value = ' '+value.substr(0, s) + da + value.substr(e)
        e += da.length
        await po(value, s, e, this, lf)
    }

    async function kd(en) {
        let {value, selectionEnd: e, selectionStart: s} = this;
        const {code, key} = en;
        if (/Arrow(Up|Down|Right)|Tab/.test(code)) {
            const l = db.length
            let p = 0
            if (l && /up|down/i.test(code)) {
                if ('ArrowDown' === code) {
                    idx++
                } else if ('ArrowUp' === code) {
                    idx--
                }
                if (idx < 0) idx = 0
                if (idx > l - 1) idx = l - 1
                p = 1
            } else if (/Tab|ArrowRight/.test(code) && e === value.length) {
                const c = db[idx];
                if (c) {
                    v = c
                    p = 1
                }
            }
            if (p) {
                en.preventDefault()
                await tick()
                if (sl) {
                    const a = sl.querySelector('.ac')
                    if (a) a.scrollIntoView({
                        behavior: 'smooth'
                    })
                }
                return
            }
        }
        const lf = value.length - e;
        if (code === 'Backspace') {
            if (!value) {
                ts.pop()
                ts = [...ts]
            }
        }
        value = value.toLowerCase()
        if ((!cp && /^(Space|Tab)$/gi.test(code)) ||
            /^(Enter)$/gi.test(code) || (/[,;，；、\n]/).test(key)) {
            en.preventDefault()
            value = value.substr(0, s) + ' ' + value.substr(e)
            e++
        }
        idx = 0
        pos();
        await po(value, s, e, this, lf)
    }

    async function po(value, s, e, ipt, lf) {
        if (/ /.test(value)) {
            const c = value.split(/ +/).filter(a => a&&ts.indexOf(a)===-1)
            let l = c.length
            if (e < value.length && s > 0) l--
            if (l) {
                for (let i = 0; i < l; i++) {
                    const f = c.shift()
                    if (f && ts.indexOf(f) === -1) {
                        ts = ts.concat(f)
                    }
                }
            }
            change();
            v = c[0] || '';
            if (v) {
                e = v.length - lf
                if (e < 0) e = 0
                await tick();
                ipt.setSelectionRange(e, e)
            }
        }
    }

    async function se(a) {
        v = db[a] || v
        await tick()
        ipt.focus()
    }

    function me(a) {
        idx = a
        pr = db[a] || ''
    }

    $:{
        pos()
        db = $tags.filter(a => v && a !== v &&ts.indexOf(a)===-1 &&!a.indexOf(v.toLowerCase()))
        pr = db[idx] || ''
    }
</script>
<div class="tgs" on:click|stopPropagation={e=>{
    if(/tgs/.test(e.target.className))ipt.focus()
}}>
    {#each ts as t,i}
        <div class="t">
            <label>{t}</label>
            <i on:click={ async ()=>{
                ts.splice(i,1)
                ts=[...ts]
                await tick()
                pos()
                ipt.focus()
            }}>x</i>
        </div>
    {/each}
    <span bind:offsetWidth={w}
          class="s" style={`left:${x}px;top:${y}px`}>
        <span>{v}</span>{pr.substr(v.length)}</span>
    <input bind:value={v} type="text"
           style={`width:${w}px`}
           on:paste={ps}
           on:compositionstart={()=>cp=1}
           on:compositionupdate={()=>cp=1}
           on:compositionend={()=>cp=0}
           on:keydown|stopPropagation={kd}
           bind:this={ipt}
    />
    <div class="sl" bind:this={sl}>
        {#each db as d,i}
            <div
                    class:ac={idx===i}
                    on:click={()=>se(i)}
                    on:mouseenter={()=>me(i)}
            >{d}</div>
        {/each}
    </div>
</div>
<style lang="scss">
  .tgs {
    width: 100%;
    min-height: 40px;
    display: flex;
    flex-wrap: wrap;
    padding: 3px;

    .t {
      border-radius: 4px;
      overflow: hidden;
      background: #1d314a;
      display: flex;
      height: 20px;
      margin: 2px;
      color: #8db2e9;

      &:hover {
        background: #00a1ff;
        color: #000;
      }
    }

    .s {
      position: absolute;
      min-width: 40px;
      color: #4b5e75;

      span {
        color: transparent;
        font: inherit;
        line-height: inherit;
      }
    }

    input {
      top: 0;
      left: 0;
    }

    .s, input {
      display: flex;
      align-items: center;
      font-family: inherit;
      font-size: 13px;
      font-weight: inherit;
      transform: none;
      height: 22px;
      line-height: 23px;
      padding: 2px 5px;
    }


    i {
      cursor: pointer;
      color: inherit;
      border-left: 1px solid #0e1832;
      width: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-style: normal;

      &:hover {
        background: #3c77c6;
      }
    }

    label {
      color: inherit;
      padding: 0 5px;
    }

    input:focus + .sl, .sl:hover {
      display: block;
    }

    .sl {
      display: none;
      left: 3px;
      right: 3px;
      z-index: 999;
      position: absolute;
      top: 100%;
      max-height: 100px;
      overflow: auto;
      overflow-x: hidden;

      div {
        cursor: pointer;
        padding: 5px 10px;
        margin-bottom: 1px;
        background: rgba(0, 0, 0, .3);
      }

      .ac {
        color: orange;
      }
    }
  }
</style>
