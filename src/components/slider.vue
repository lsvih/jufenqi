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
    //给泽鑫的注释:下面是原来的代码
    // const firstChild = element.firstChild;
    // const lastChild = element.lastChild;
    // 出问题的原因是写这个代码的童鞋没有考虑到别人会复用代码且复用的不是很规范，
    //导致firstChild和lastChild吧 #text Node给取出来了。此处需要做的事是正确取出dom节点
    // 下面是新代码
    function getFirstchild(n) {
      let x = n.firstChild;
      while (x.nodeType != 1) {
        x = x.nextSibling;
      }
      return x;
    }
    function getLastchild(n) {
      let x = n.lastChild;
      while (x.nodeType != 1) {
        x = x.previousSibling;
      }
      return x;
    }
    const firstChild = getFirstchild(element)
    const lastChild = getLastchild(element)
    element.appendChild(firstChild.cloneNode(true));
    element.insertBefore(lastChild.cloneNode(true), firstChild);
    //为什么要这么做呢？如果你自己写过轮播图组件就会了解，为了能让第一张图往前滚以及最后一张图往后滚能够流畅进行，一般
    //大家会把最后一张图clone一份在第一张图的前面，这样第一张图往前翻时直接就能看到最后一张图。这样的滚动效果就会比较
    //流畅。最后一张图往后滚同理。
    //之前我们这儿出现的问题就是上面的注释里所说的原因，作者本来的复制操作因为没考虑周全失败了，导致第一张图和最后一张图
    //切换的时候跳动。
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
