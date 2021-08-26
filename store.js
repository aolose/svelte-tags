import {writable} from 'svelte/store';

export const post = writable({tags:""})

export const tags = writable([
  'aa','ab','abc','abcd','abb','abcc',
	'ads','ass','ask','assa','sada','adsada'
])
