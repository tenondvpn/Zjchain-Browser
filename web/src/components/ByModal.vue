<script >
export default {
  props: {
    show: {
      type:Boolean,
      default:false
    }
  }
}

</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-dialog modal-lg">
      <div class="modal-content bg-secondary">
        <div class="modal-header">
          <h4 class="modal-title">Buy Coin</h4>
          <button type="button" class="close"  @click="$emit('close')" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card card-info">
            <form class="form-horizontal" id="quickForm">
              <div class="card-body">
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead" id="buy_zjchain_to_address" style="width:450px;"><b>01cab67e8eca011d1ea49177807690fa5b9958c2</b>
                      </h2>
                      <p class="text-muted text-sm" style="color: #ffc107!important;font-size: 16px!important;"><b>Warning: </b>Be
                        sure to save your private key, or the coins will be permanently lost!</p>
                      <ul class="ml-4 mb-0 fa-ul text-muted">
                        <li class="small"><span class="fa-li" style="width:350px;margin-left:-25px;">********************************************<i
                            class="fas fa-lg fa-copy" style="margin-left:50px;"></i></span></li>
                      </ul>
                    </div>
                    <div class="col-5 text-center">
                      <img src="static/images/generate.png" alt="user-avatar" class="img img-fluid"
                           style="width:150px;border: 5px solid #e1e1e1;"></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-outline-light" style="border: 0px;" data-dismiss="modal"></button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
    </div>
  </transition>
</template>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>