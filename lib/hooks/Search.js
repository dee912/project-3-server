import M8 from '../../models/m8.js'
import Pl8 from '../../models/pl8.js'


export default function Search(searchParams, whichDb) {
  if (whichDb === 'Pl8') {
    return Pl8.find(searchParams).populate('user')
  } else {
    return M8.find(searchParams).populate('user')
  }
}