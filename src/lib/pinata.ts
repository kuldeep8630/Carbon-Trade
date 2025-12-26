import pinataSDK from '@pinata/sdk'

const pinata = new pinataSDK(
  import.meta.env.VITE_PINATA_API_KEY,
  import.meta.env.VITE_PINATA_SECRET_API_KEY
)

export default pinata