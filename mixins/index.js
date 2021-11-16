export const images = {
  methods: {
    getImageUrl(item){
      return item.images[item.images.length - 1]
        ? item.images[item.images.length - 1].imageUrl
        : '/default.png'
    },
  }
}
