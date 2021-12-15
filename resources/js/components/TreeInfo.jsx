import { InfoWindow } from '@react-google-maps/api'

const TreeInfo = ({ position, onClose }) => (
  <InfoWindow onCloseClick={onClose} position={position}>
    <p>yolo</p>
  </InfoWindow>
)

export default TreeInfo
