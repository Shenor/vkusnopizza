export const images = {
  methods: {
    getImageUrl(item){
      if (!item.images) return '/default.png'
      return item.images[item.images.length - 1]
        ? item.images[item.images.length - 1].imageUrl
        : 'default_200x133.png'
    },
  }
}
