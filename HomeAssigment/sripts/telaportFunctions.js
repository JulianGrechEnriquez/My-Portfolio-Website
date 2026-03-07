     AFRAME.registerComponent('page-teleport-on-click', {
        schema: {
          url: { type: 'string', default: '' },
          
        },
        init: function () {
          this.el.addEventListener('click', () => {

              window.location.href = this.data.url;
            
          });
        }
      });


      


