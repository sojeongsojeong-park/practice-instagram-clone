import {onRequest} from './database'
import addBioEventListeners from './modules/events'
import { addGalleryEventListeners, addImagesTogallery } from './modules/events'
import Nav from './modules/Nav'
import Gallery from './modules/Gallery'
import Bio from './modules/Bio.js'

const App = async () => {
  return`
    ${Nav()}
    <div class="container">
    ${await Bio()}
    ${Gallery()}
    </div>
  `
}

onRequest.onsuccess = () => {
  document.getElementById('root').innerHTML = App()
  addBioEventListeners()
  addGalleryEventListeners()
  addImagesTogallery()
}