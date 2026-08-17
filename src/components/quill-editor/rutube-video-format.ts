import Quill from 'quill'

const Inline = Quill.import('blots/inline')

export class RutubeVideoFormat extends Inline {
	static create(value: string) {
		const node = super.create()
		const container = document.createElement('div')
		container.className = 'rutube-video-container'
		container.innerHTML = `<iframe 
			src="https://rutube.ru/play/embed/${value}/" 
			width="100%" 
			height="400" 
			frameborder="0" 
			allow="clipboard-write; autoplay" 
			webkitallowfullscreen 
			mozallowfullscreen 
			allowfullscreen
		></iframe>`
		node.appendChild(container)
		return node
	}

	static formats(node: HTMLElement) {
		const container = node.querySelector('.rutube-video-container')
		if (!container) return null
		const iframe = container.querySelector('iframe')
		if (!iframe) return null
		const src = iframe.getAttribute('src')
		if (!src) return null
		const match = src.match(/\/play\/embed\/([^/]+)/)
		return match ? match[1] : null
	}
}

RutubeVideoFormat.blotName = 'rutube-video'
RutubeVideoFormat.tagName = 'div'
Quill.register('formats/rutube-video', RutubeVideoFormat)
