import { MdLocationPin } from "react-icons/md";
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';


export const createCustomIcon = (darkMode: boolean) => {
    let iconMarkup = ''
    if(darkMode)
        iconMarkup = renderToStaticMarkup(<MdLocationPin size={30} color="white" />);
    else
        iconMarkup = renderToStaticMarkup(<MdLocationPin size={30} color="#0d1818" />);
        

    return L.divIcon({
      html: iconMarkup,
      className: 'custom-marker-icon'
    });
  };