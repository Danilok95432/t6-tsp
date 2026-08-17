import Quill from 'quill'

declare global {
	interface Window {
		VK?: {
			Widgets: {
				Video: (id: string, options: { width: string; height: number; video: string }) => void
			}
		}
	}
}

const Inline = Quill.import('blots/inline')

export class VKVideoFormat extends Inline {
	static create(value: { oid: string; id: string }) {
		const node = super.create()
		const container = document.createElement('div')
		container.className = 'vk-video-container'

		const videoContainer = document.createElement('div')
		videoContainer.id = `vk_video_${value.oid}_${value.id}`
		container.appendChild(videoContainer)

		if (!document.querySelector('script[src*="vk.com/js/api/openapi.js"]')) {
			const script = document.createElement('script')
			script.src = 'https://vk.com/js/api/openapi.js?169'
			script.async = true
			script.onload = () => {
				if (window.VK?.Widgets) {
					window.VK.Widgets.Video(`vk_video_${value.oid}_${value.id}`, {
						width: '100%',
						height: 400,
						video: `${value.oid}_${value.id}`,
					})
				}
			}
			document.head.appendChild(script)
		} else if (window.VK?.Widgets) {
			window.VK.Widgets.Video(`vk_video_${value.oid}_${value.id}`, {
				width: '100%',
				height: 400,
				video: `${value.oid}_${value.id}`,
			})
		}

		return node
	}

	static formats(node: HTMLElement) {
		const container = node.querySelector('.vk-video-container')
		if (!container) return null
		const videoId = container.querySelector('div')?.id.split('_').slice(-2)
		if (!videoId) return null
		return { oid: videoId[0], id: videoId[1] }
	}
}

VKVideoFormat.blotName = 'vk-video'
VKVideoFormat.tagName = 'div'
Quill.register('formats/vk-video', VKVideoFormat)
