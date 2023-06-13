
  import { Carousel, CarouselTransition } from 'flowbite-svelte'
  // ./imageData/+server.js has the following
let data=[]
for (var a =1;a<=42;a++){
data.push({
  id: a,
  url: `/src/lib/images/TPR101V/TPR101V_0${a}.jpg`,
})
}
  
  export const images = data
