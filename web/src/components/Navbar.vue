<script>

import {defineComponent} from "vue";
import ByModal from "./ByModal.vue";

export default defineComponent({
  components: {ByModal},
  data() {
    return {
      showBuyModal:false
    }
  }
})
</script>
<template>
  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-dark navbar-light">
    <a href="/zjchain/" class="navbar-brand">
      <img src="" alt="" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-border" style="color:#d6712c;">ChainBaas</span>
    </a>

    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item d-none d-sm-inline-block  active bg-gray">
        <a href="/zjchain/" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="/zjchain/contract" class="nav-link">Contract</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="far fa-user"></i>
          <span class="badge badge-danger navbar-badge" style="display:block">!</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="max-width:370px!important;">
          <span class="dropdown-item dropdown-header">Setup your private key</span>
          <div class="dropdown-divider"></div>
          <a href="javascript:void(0)" class="dropdown-item">
            <i class="fas  fa-key mr-2" style="display:inline;"></i><input type="password" onchange="setup_global_private_key()" class="form-control" id="private_key_input" placeholder="Private Key" style="display:inline;width:315px;">
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:void(0)" class="dropdown-item" id="global_account_id" onclick="click_auto_search_data()">
            <i class="fas fa-user mr-2"></i>
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:void(0)" class="dropdown-item" id="global_balance">
            <i class="fas fa-map mr-2"></i>
            <span class="float-right text-muted text-sm badge bg-warning">balance</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="javascript:void(0)" class="dropdown-item dropdown-footer">
            <input type="button" class="btn btn-block btn-success btn-sm" value="buy" data-toggle="modal"  @click="showBuyModal = true" style="display:inline;width:300px;margin-top:8px;">
          </a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <ByModal :show="showBuyModal" @close="showBuyModal = false"></ByModal>

</template>

<style scoped>

</style>