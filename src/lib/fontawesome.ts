import { library } from '@fortawesome/fontawesome-svg-core';
import { config } from '@fortawesome/fontawesome-svg-core';

// Import solid icons
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faUserCheck,
  faHandshake,
  faMicrophone,
  faEnvelopeOpenText,
  faClipboardQuestion,
  faHexagonNodes
} from '@fortawesome/free-solid-svg-icons';

// Import brand icons
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
  faYoutube,
  faSpotify,
  faApple
} from '@fortawesome/free-brands-svg-icons';

// Prevent FontAwesome from adding its CSS since we'll be manually adding the CSS file
config.autoAddCss = false;

// Add all icons to the library
library.add(
  // Solid icons
  faCheck,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faClock,
  faEnvelope,
  faMapMarkerAlt,
  faBars,
  faTimes,
  faUserCheck,
  faHandshake,
  faMicrophone,
  faEnvelopeOpenText,
  faClipboardQuestion,
  faHexagonNodes,
  
  // Brand icons
  faTwitter,
  faFacebook,
  faLinkedin,
  faInstagram,
  faYoutube,
  faSpotify,
  faApple
);

export default library; 