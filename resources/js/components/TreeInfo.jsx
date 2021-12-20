import { InfoWindow } from '@react-google-maps/api'
import { TREE_PROPERTIES } from '../constants'

export const TreeInfo = ({ position, onClose, properties }) => (
  <InfoWindow onCloseClick={onClose} position={position}>
    <>
      <span className="text-lg font-medium">
        {properties.BMN_BOOMSOORT_NED}
        {properties.BMN_PLANTJAAR
          ? ` geplant in ${properties.BMN_PLANTJAAR}`
          : ''}
      </span>
      <ul>
        {TREE_PROPERTIES.map(([prop, label]) => (
          <li key={prop}>
            <span className="font-medium">{label}:</span>&nbsp;
            {properties[prop] ?? 'Onbekend'}
          </li>
        ))}
      </ul>
    </>
  </InfoWindow>
)
