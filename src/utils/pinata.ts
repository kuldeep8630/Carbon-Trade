import pinataSDK from '@pinata/sdk';

const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_API_KEY;

if (!pinataApiKey || !pinataSecretApiKey) {
  throw new Error('Missing Pinata environment variables');
}

export const pinata = new pinataSDK(pinataApiKey, pinataSecretApiKey);

export const uploadToIPFS = async (file: File): Promise<string> => {
  try {
    const result = await pinata.pinFileToIPFS(file.stream(), {
      pinataMetadata: {
        name: file.name,
      },
    });
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

export const uploadJSONToIPFS = async (json: object): Promise<string> => {
  try {
    const result = await pinata.pinJSONToIPFS(json);
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
};