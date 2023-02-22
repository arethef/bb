<template>
  <div>
    <p>[BrandProductDetailMarketsTable.vue]</p>
    <p>
      번호 | 마켓번호 | 마켓제목 | 마켓오픈일시 | 마켓마감일시 | 마감여부 |
      티켓수량
    </p>
    <div class="md:container md:mx-auto flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full border text-center text-xs">
              <thead class="bg-gray-100">
                <tr class="border-b">
                  <th scope="col" class="font-medium px-6 py-2 border-r">#</th>
                  <th scope="col" class="font-medium px-6 py-2 border-r">
                    마켓번호
                  </th>
                  <th scope="col" class="font-medium px-6 py-2 border-r">
                    마켓제목
                  </th>
                  <th scope="col" class="font-medium px-6 py-2 border-r">
                    마켓오픈일시
                  </th>
                  <th scope="col" class="font-medium px-6 py-2 border-r">
                    마켓마감일시
                  </th>
                  <th scope="col" class="font-medium px-6 py-2 border-r">
                    마감여부
                  </th>
                  <th scope="col" class="font-medium px-6 py-2">티켓수량</th>
                </tr>
              </thead>
              <!-- <tbody class="bg-white">
                <tr
                  v-for="(ticket, index) in this.brandStore.getBrandTickets"
                  :key="ticket.id"
                  @click="moveBrandTicketDetailView(ticket.id)"
                  class="border-b"
                >
                  <th
                    scope="row"
                    class="
                      px-6
                      py-2
                      whitespace-nowrap
                      text-sm
                      font-medium
                      border-r
                    "
                  >
                    {{ index + 1 }}
                  </th>
                  <td
                    class="
                      px-6
                      py-2
                      whitespace-nowrap
                      text-sm
                      font-medium
                      border-r
                    "
                  >
                    {{ ticket.id }}
                  </td>
                  <td
                    class="
                      text-sm
                      font-light
                      px-6
                      py-2
                      whitespace-nowrap
                      border-r
                    "
                  ></td>
                  <td
                    class="
                      text-sm
                      font-light
                      px-6
                      py-2
                      whitespace-nowrap
                      border-r
                    "
                  ></td>
                  <td
                    class="
                      text-sm
                      font-light
                      px-6
                      py-2
                      whitespace-nowrap
                    "
                  ></td>
                </tr>
              </tbody> -->
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>