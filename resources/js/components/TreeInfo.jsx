import { InfoWindow } from '@react-google-maps/api'

const TreeInfo = ({ position, onClose, properties }) => (
  <InfoWindow onCloseClick={onClose} position={position}>
    <ul>
      {Object.entries(properties).map(([key, value]) => (
        <li key={key}>
          <span className="font-medium">{key}:</span>
          {value}
        </li>
      ))}
    </ul>
  </InfoWindow>
)

export default TreeInfo
