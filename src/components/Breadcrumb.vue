<template>
  <div>
    <!-- Content Header (Page header breadcrumb) -->
    <section class="content-header" style="padding: 0px 15px 0 15px;">
      <ol id="nav_title" class="breadcrumb" style="position: static; float: none;">
        <li v-for="(item,index) in breadList" :key="index" :class="{active:index===breadList.length-1}">
          <router-link :to="{path:item.path}">
            <i v-if="item.name==='Home'" class="fa fa-home"
               style="font-size: 16px; position: relative; top: 2px; left: -3px;"></i>
            {{item.meta.title}}
          </router-link>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Breadcrumb',
    data() {
      return {
        breadList: []
      }
    },
    created() {
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
        const first = matched[0] && matched[0].name;
        if (first.toLocaleLowerCase() !== "home") {
          matched = [{path: '/', meta: {title: 'Home'}}].concat(matched)
        }
       // var breadList=JSON.stringify(matched);
       // this.$store.commit('breadListMutations',breadList);
        this.breadList=matched;//this.$store.getters.breadListState;
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    }
  }
</script>

<style scoped>


</style>
