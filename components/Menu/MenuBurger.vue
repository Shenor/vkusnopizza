<template>
  <div class="toggle-menu d-block d-sm-block d-md-none ml-auto" v-b-toggle.sidebar-right.sidebar-no-header>
    <div class="hamburger">
      <span class="hamburger-slice top" :class="isOpen ? 'top-anim bg-light' : 'top-anim-r'"></span>
      <span class="hamburger-slice mid" :class="isOpen ? 'mid-anim bg-light' : 'mid-anim-r'"></span>
      <span class="hamburger-slice bot" :class="isOpen ? 'bot-anim bg-light' : 'bot-anim-r'"></span>
    </div>
  </div>
</template>

<script>
export default {
   data() {
    return{
      isOpen: this.isInternalMenu ? true : false
    }
  },
  props: ['isInternalMenu']
}
</script>

<style lang="scss" scoped>
.hamburger{
  width: 40px;
  height: 30px;
  display:flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: space-between;
}

.hamburger-slice{
  width: 40px;
  height: 4px;
  background-color: #333333;
}

.bg-light{
  background-color: #fff !important;
}

.top-anim{
  animation: top-k 0.2s;
  animation-fill-mode: forwards;
}

.top-anim-r{
  animation: top-k-r 0.2s;
  animation-fill-mode: forwards;
}

.mid-anim{
  animation: mid-k 0.2s;
  animation-fill-mode: forwards;
}

.mid-anim-r{
  animation: mid-k-r 0.2s;
  animation-fill-mode: forwards;
}

.bot-anim{
  animation: bot-k 0.2s;
  animation-fill-mode: forwards;
}

.bot-anim-r{
  animation: bot-k-r 0.2s;
  animation-fill-mode: forwards;
}


@keyframes top-k{
  from{
    transform:rotate(0deg) translate(0,0);
  }
  to{
    transform:rotate(45deg) translate(10px,10px);
  }
}

@keyframes top-k-r{
  from{
    transform:rotate(45deg) translate(10px,10px);
  }
  to{
    transform:rotate(0deg) translate(0,0);
  }
}

@keyframes mid-k{
  from{opacity:1;}
  to{opacity:0;}
}

@keyframes mid-k-r{
  from{opacity:0;}
  to{opacity:1;}
}

@keyframes bot-k{
  from{
    transform:rotate(0deg) translate(0,0);
  }
  to{
    transform:rotate(-45deg) translate(9.5px,-9.5px);
  }
}

@keyframes bot-k-r{
  from{
    transform:rotate(-45deg) translate(9.5px,-9.5px);
  }
  to{
    transform:rotate(0deg) translate(0,0);
  }
}
</style>

