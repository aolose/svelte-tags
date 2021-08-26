<script>
import Tag from './Tag.svelte'
</script>
<svelte:head>
	<style>
        * {
            position: relative;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            background: none;
            color: #aaa;
            border: none;
            outline: none;
        }

        *::-webkit-scrollbar {
            width: 8px;
            height: 8px
        }

        *::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, .05)
        }

        *::-webkit-scrollbar-thumb {
            background-color: #075291
        }
       i{
           display: block;
           background: no-repeat center;
           background-size: contain;
       }
        html, body {
            font-size: 13px;
            margin: 0;
            height: 100%;
            width: 100%;
            font-family: -apple-system, BlinkMacSystemFont, PingFang SC, Helvetica Neue, STHeiti, Microsoft Yahei, Tahoma, Simsun, sans-serif
        }
	input{
		color:#fff;
		border:none;
    background:none;
	}
        body {
					padding:30px;
            height: 100%;
            width: 100%;
					display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: #121622;
        }
    </style>
</svelte:head>
<h4>
	Tags demo
</h4>
<br>
<label>type 'a' to show an input list</label>
<div>
	<Tag/>
</div>
<style>
	div{
		margin:10px 0;
		width: 300px;
    height:auto;
    color: #8ca4d7;
    line-height: 1.5;
    border: 1px solid #1d314a;
    border-radius: 6px;
    background: rgba(36, 46, 65, 0.4);
    padding: 9px 10px;
    resize: none;
    display: block;
    min-height: 30px;
	}
</style>
