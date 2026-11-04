const menuVistas = document.querySelector('.menu-vistas');
import { actualizarGrafico } from "../dashboard/renderDashboards.js";

export function initVistas() {
    menuVistas.addEventListener('click', (event) => {
    if(!(event.target.dataset.vista)) { return }
    const vistas = document.querySelectorAll('#vista-gastos, #vista-dashboards, #vista-ajustes');

    for(const vista of vistas) {
      const id = `vista-${event.target.dataset.vista}`

      vista.classList.toggle('visible', vista.id === id)
      
      if(vista.id === 'vista-dashboards') { actualizarGrafico() }
    }
});
}