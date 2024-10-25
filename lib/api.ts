export class API {
  public static uploadImage = async (_file: File) => {
    console.log('hello')
    // console.log('Image upload is disabled in the demo... Please implement the API.uploadImage method in your project.')
    // await new Promise(r => setTimeout(r, 500))
    return {
      url: `http://localhost:3000/api/image/1QwS_7XxExF1gBJfNlOrhmqviqmXmMAMk`,
      imageId: '1QwS_7XxExF1gBJfNlOrhmqviqmXmMAMk',
    }
  }
}

export default API
