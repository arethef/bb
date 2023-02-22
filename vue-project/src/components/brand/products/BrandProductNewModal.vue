<template>
  <div class="container mx-auto">
    <div class="flex justify-end">
      <button
        @click="openProductNewModal"
        class="
          inline-block
          px-4
          py-2
          bg-bb-b
          text-white
          font-medium
          text-xs
          leading-tight
          rounded
          shadow-md
          hover:bg-bb-a hover:shadow-lg
          active:bg-bb-a1 active:shadow-lg
          transition
          duration-150
          ease-in-out
        "
        type="button"
      >
        상품추가
      </button>

      <div
        v-show="isProductNewModalVisible"
        class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
      >
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <!-- modal header -->
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">New Product</h3>
            <svg
              @click="closeProductNewModal"
              xmlns="http://www.w3.org/2000/svg"
              class="w-8 h-8 text-bb-txt cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <!-- modal body -->
          <div class="mt-8">
            <div class="border p-4">
              <div class="grid grid-flow-col-dense grid-cols-4 gap-2">
                <div class="col-span-1 grid gap-1 m-1">
                  <div class="p-1">
                    <label for="name" class="block">상품이름</label>
                  </div>
                </div>
                <div class="col-span-3 grid gap-1 m-1">
                  <div class="grid grid-flow-col-dense grid-cols-9 p-1">
                    <input
                      type="text"
                      id="name"
                      class="col-span-9 form-input block text-xs"
                      placeholder="호지크림빵"
                      v-model="reqCreateProductDto.product.name"
                    />
                  </div>
                </div>
              </div>

              <div class="grid grid-flow-col-dense grid-cols-4 gap-2">
                <div class="col-span-1 grid gap-1 m-1">
                  <div class="p-1">
                    <label for="description" class="block">상품설명</label>
                  </div>
                </div>
                <div class="col-span-3 grid gap-1 m-1">
                  <div class="grid grid-flow-col-dense grid-cols-9 p-1">
                    <input
                      type="text"
                      id="description"
                      class="col-span-9 form-input block text-xs"
                      placeholder="쫀득 꾸덕 퍽퍽"
                      v-model="reqCreateProductDto.product.description"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-flow-col-dense grid-cols-4 gap-2">
                <div class="col-span-1 grid gap-1 m-1">
                  <div class="p-1">
                    <label for="price" class="block">상품가격</label>
                  </div>
                </div>
                <div class="col-span-3 grid gap-1 m-1">
                  <div class="grid grid-flow-col-dense grid-cols-9 p-1">
                    <input
                      type="text"
                      id="price"
                      class="col-span-9 form-input block text-xs"
                      placeholder="3900"
                      v-model="reqCreateProductDto.product.price"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-flow-col-dense grid-cols-4 gap-2">
                <div class="col-span-1 grid gap-1 m-1">
                  <div class="p-1">
                    <label for="imageFile" class="form-label">상품사진</label>
                  </div>
                </div>
                <div class="col-span-3 grid gap-1 m-1">
                  <div class="p-1">
                    <input
                      type="file"
                      accept="image/*"
                      class="form-control"
                      id="imageFile"
                      @change="selectImageFile"
                    />
                  </div>
                  <div class="p-1">
                    <div id="profileImagePreview">
                      <!-- <p>프로필 이미지 미리보기</p> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- modal footer -->
          <div class="mt-8 flex justify-end">
            <button
              @click="closeProductNewModal"
              class="px-4 py-2 text-xs text-bb-b border border-bb-b rounded"
            >
              취소
            </button>
            <button
              @click="onClickProductNewBtn"
              class="px-4 py-2 text-xs ml-2 text-bb-bg bg-bb-b rounded"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useImageStore } from "@/stores/image";
import { useProductStore } from "@/stores/product";
export default {
  setup() {
    const imageStore = useImageStore();
    const productStore = useProductStore();
    return { imageStore, productStore };
  },
  data() {
    return {
      isProductNewModalOpen: false,
      reqCreateProductDto: {
        product: {
          name: "호지크림빵",
          description: "쫀득꾸덕퍽퍽",
          price: 4300,
          imageId: "",
        },
        image: {
          formData: null,
        },
      },
    };
  },
  computed: {
    isProductNewModalVisible() {
      return this.isProductNewModalOpen;
    },
  },
  methods: {
    async onClickProductNewBtn() {
      console.log(
        `++++++ [BrandProductNewModal.vue] onClickProductNewBtn() ++++++`
      );
      this.reqCreateProductDto.product.imageId =
        await this.imageStore.uploadImage(
          this.reqCreateProductDto.image.formData
        );
      const result = await this.productStore.createProduct(
        this.reqCreateProductDto.product
      );
      console.log(
        `❯❯❯❯❯❯ [BrandProductNewModal.vue] onClickProductNewBtn() result:`,
        result
      );
      this.isProductNewModalOpen = false;
      // todo: 모달에 담겨있는 정보도 지워야 할텐데
      // this.$router.push(`/b/products/${result.id}`);
      await this.productStore.detailProduct(result.id);
      this.$router.push({
        name: `BrandProductDetail`,
        params: { productId: result.id },
      });
    },
    selectImageFile(e) {
      if (!e) {
        return;
      }
      const files = e.target.files;
      if (files.length > 0) {
        const formData = new FormData();
        formData.append("imageFile", files[0]);
        this.reqCreateProductDto.image.formData = formData;
        this.showProfileImage(files[0]);
      } else {
        this.clearProfileImage();
      }

      ////
      // const headers = {
      //   "Content-Type": "multipart/formdata",
      // };
      // this.imageStore.testUploadImage(
      //   this.brandSignupImageDto.formData,
      //   headers
      // );
    },
    showProfileImage(file) {
      this.clearProfileImage();
      const figure = document.createElement("figure");
      figure.classList.add("figure");
      figure.id = "figure";
      document.getElementById("profileImagePreview").appendChild(figure);
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style = `width:100px; height:100px`;
      document.getElementById("figure").appendChild(img);
      const figcaption = document.createElement("figcaption");
      figcaption.classList.add("figure-caption");
      figcaption.innerHTML = `${file.name}`;
      document.getElementById("figure").appendChild(figcaption);
    },
    clearProfileImage() {
      document.getElementById("profileImagePreview").innerHTML = "";
    },
    openProductNewModal() {
      this.isProductNewModalOpen = true;
    },
    closeProductNewModal() {
      this.isProductNewModalOpen = false;
    },
  },
};
</script>