import { ThreeDPhotoCarousel } from './3d-carousel'
import { aboutContent } from '../../config/about.js'

// Demo con los datos reales del proyecto; no requiere proveedores adicionales.
export function ThreeDPhotoCarouselDemo() {
  return <ThreeDPhotoCarousel cards={aboutContent.overview.cards} label={aboutContent.overview.title} />
}
