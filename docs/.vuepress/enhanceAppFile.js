import AutoBrightWatermark from 'auto-bright-watermark'
export default ({ Vue, router }) => {
  router.afterEach((to) => {
    setTimeout(() => {
      new AutoBrightWatermark(
        {
          repeat: false,
          rotate: -5,
          color: 'rgba(126, 198, 153, 0.4)',
          contentSize: {
            width: 100,
            height: 400
          },
          content: 'lxh’s bolg'
        }
      )
    }, 2000)
  })
  
}