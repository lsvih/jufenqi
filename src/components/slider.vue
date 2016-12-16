<template>
  <div class="slider">
    <div class="track animated"><slot></slot></div>
  </div>
</template>

<script>
  import Hammer from 'hammerjs'

  export default {
    data() {
      return {
        timeoutId: null,
        index: 0,
        count: 0,
        element: null
      };
    },
    props: ['scale', 'autoplay', 'control', 'infinity', 'swipe'],
    computed: {
      scaleRate() {
        return parseFloat(this.scale, 10) || 1;
      }
    },
    methods: {
      slide(directionName) {
        clearTimeout(this.timeoutId);

        const element = this.element;
        const count = this.count;
        /* eslint-disable */
        const windowWidth = document.body.offsetWidth * this.scaleRate;
        const direction = directionName === 'right' ? 1 : -1;

        let index = this.index;
        index = (index + count) % count;

        if (index === 1) {
          if (direction === 1) {
            if (this.infinity !== false) {
              // move left
              index = count - 1;
              element.classList.remove('animated');
              element.style.transform = `translateX(-${windowWidth * (index)}px)`;
              /* eslint-disable */
              element.offsetHeight;
              element.classList.add('animated');

              index -= 1;
            }
          } else index += 1;

          element.style.transform = `translateX(-${windowWidth * (index)}px)`;
        } else if (index + 2 === count) {
          if (direction === -1) {
            if (this.infinity !== false) {
              // move right
              index = 0;
              element.classList.remove('animated');
              element.style.transform = `translateX(-${windowWidth * (index)}px)`;
              /* eslint-disable */
              element.offsetHeight;
              element.classList.add('animated');

              index += 1;
            }
          } else index -= 1;

          element.style.transform = `translateX(-${windowWidth * (index)}px)`;
        } else if (index === 0) {
          index += 1;

          element.classList.remove('animated');
          element.style.transform = `translateX(-${windowWidth * (index)}px)`;
          /* eslint-disable */
          element.offsetHeight;
          element.classList.add('animated');
        } else {
          index -= direction;
          element.style.transform = `translateX(-${windowWidth * (index)}px)`;
        }


        [].slice.call(element.children).forEach((child, i) => {
          const target = (index + count) % count;
          if (i === target || target === count - 2 && i === 0 || target === 1 && i === count - 1) {
            child.classList.add('current');
          }
          else {
            child.classList.remove('current');
          }
        });

        this.index = index;
        if (this.autoplay) {
          this.timeoutId = setTimeout(() => this.slide(), 4000);
        }
      }
    },
    ready() {
      const element = this.element = this.$el.querySelector('.track');
      const firstChild = element.firstChild;
      const lastChild = element.lastChild;
      element.appendChild(firstChild.cloneNode(true));
      element.insertBefore(lastChild.cloneNode(true), firstChild);

      const children = [].slice.call(element.children);
      this.count = children.length;
      /* eslint-disable */
      const windowWidth = document.body.offsetWidth;
      element.style.transform = `translateX(-${windowWidth * this.index}px)`;
      element.style.paddingLeft = `${windowWidth * (1 - this.scaleRate) / 2}px`;
      children.forEach((child) => {
        child.addEventListener('dragstart', (e) => e.preventDefault());
        child.style.width = `${windowWidth * this.scaleRate}px`;
        child.style.height = `${windowWidth* children.offsetHeight / children.offsetWidth * this.scaleRate}px`;
      });

      element.classList.remove('animated');
      this.slide();
      /* eslint-disable */
      element.offsetHeight;
      element.classList.add('animated');

      if (this.autoplay) {
        this.timeoutId = setTimeout(() => this.slide(), 4000);
      }

      if (this.swipe !== false) {
        const $track = new Hammer(this.$el);

        $track.add(new Hammer.Swipe({
          direction: Hammer.DIRECTION_HORIZONTAL
        }));
        $track.add(new Hammer.Pan({
          direction: Hammer.DIRECTION_HORIZONTAL,
          threshold: 50
        }));

        $track.on('panend', (event) => {
          this.slide(event.additionalEvent.replace('pan', ''));
        });
      }

      if (this.control) {
        this.control.slide = this.slide.bind(this);
      }
    },
    beforeDestroy() {
      clearTimeout(this.timeoutId);
    }
  }
</script>

<style scoped>
  .slider {
    white-space: nowrap;
    overflow-x: hidden;
    padding-bottom: 15px;
  }

  .slider img {
    width: 100%;
    font-size: 0;
  }

  .slider .track > * {
    display: inline-block;
    position: relative;
  }

  .slider .track {
    touch-action: manipulation;
    display: inline-block;
  }

  .slider .track.animated {
    transform: translateZ(0);
    transition: all cubic-bezier(0.785, 0.135, 0.15, 0.86) .6s;
  }
</style>
