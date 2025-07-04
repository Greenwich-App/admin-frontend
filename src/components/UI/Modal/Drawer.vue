<template>
    <div>
      <div class="drawer" :class="{ 'is-open': isOpen, 'is-visible': isVisible }">
        <div
          class="drawer__overlay"
          :style="{ transitionDuration: `${speed}ms` }"
        ></div>
        <div
          class="drawer__content"
          :class="{
            'drawer__content--right': position === 'right',
            'drawer__content--left': position === 'left',
          }"
          v-click-away="closeDrawer"
          :style="{
            maxWidth: maxWidth,
            transitionDuration: `${speed}ms`,
            backgroundColor: backgroundColor,
          }"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { directive } from "vue3-click-away";
  
  export default {
    name: "DrawerView",
  
    directives: {
      ClickAway: directive,
    },
  
    props: {
      isOpen: {
        type: Boolean,
        required: false,
        default: false,
      },
  
      maxWidth: {
        type: String,
        required: false,
        default: "600px",
      },
      position: {
        type: String,
        required: false,
        default: "right",
      },
  
      // Transition Speed in Milliseconds
      speed: {
        type: Number,
        required: false,
        default: 300,
      },
  
      backgroundColor: {
        type: String,
        required: false,
        default: "#fafafa",
      },
    },
  
    data() {
      return {
        isVisible: false,
        isTransitioning: false,
      };
    },
  
    watch: {
      isOpen(val) {
        this.isTransitioning = true;
  
        if (val) {
          this.toggleBackgroundScrolling(true);
          this.isVisible = true;
        } else {
          this.toggleBackgroundScrolling(false);
          setTimeout(() => (this.isVisible = false), this.speed);
        }
  
        setTimeout(() => (this.isTransitioning = false), this.speed);
      },
    },
  
    methods: {
      toggleBackgroundScrolling(enable) {
        const body = document.querySelector("body");
  
        body.style.overflow = enable ? "hidden" : null;
      },
  
      closeDrawer() {
        // console.log("closeDrawer");
        if (!this.isTransitioning) {
          this.$emit("close");
        }
      },
    },
  
    mounted() {
      this.isVisible = this.isOpen;
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .drawer {
    visibility: hidden;
  
    &.is-visible {
      visibility: visible;
    }
  
    &.is-open {
      .drawer__overlay {
        opacity: 0.5;
      }
  
      .drawer__content {
        transform: translateX(0);
      }
    }
  
    &__overlay {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      opacity: 0;
      transition-property: opacity;
      background-color: #000000;
      user-select: none;
    }
  
    &__content {
      position: fixed;
      top: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
      z-index: 100;
      overflow: auto;
      transition-property: transform;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      box-shadow: 0 2px 6px #777;
      &--right {
        right: 0;
      }
      &--left {
        left: 0;
      }
    }
  }
  </style>