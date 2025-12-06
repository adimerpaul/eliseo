<template>
  <q-page class="q-pa-md">
    <!-- Encabezado -->
    <div class="row items-center q-mb-md">
      <q-btn flat round dense icon="arrow_back" @click="$router.go(-1)" class="q-mr-sm" />
      <div class="text-h5 text-weight-bold text-primary">Ventas</div>
      <q-space />
      <q-btn flat round dense icon="refresh" @click="productosGet" :loading="loading" />
    </div>

    <div class="row q-col-gutter-lg">
      <!-- Panel izquierdo - Productos -->
      <div class="col-12 col-md-7">
        <q-card class="shadow-1" flat bordered>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Productos Disponibles</div>
            <div class="text-caption">Seleccione productos para la venta</div>
          </q-card-section>

          <q-card-section>
            <div class="row q-col-gutter-md q-mb-md">
              <div class="col-12">
                <q-input
                  ref="inputBuscarProducto"
                  v-model="productosSearch"
                  outlined
                  clearable
                  label="Buscar producto por nombre o código de barras"
                  dense
                  debounce="300"
                  @update:modelValue="productosGet"
                  class="search-input"
                >
                  <template #prepend>
                    <q-icon name="search" />
                  </template>
                  <template #append>
                    <q-btn round dense flat icon="mic" v-if="recognition" @click="startRecognition('productosSearch')" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="flex flex-center q-mb-sm">
              <q-pagination
                size="sm"
                v-model="pagination.page"
                :max="Math.ceil(pagination.rowsNumber / pagination.rowsPerPage)"
                color="primary"
                @update:model-value="productosGet"
                boundary-numbers
                max-pages="5"
              />
            </div>

            <div class="row q-col-gutter-sm">
              <template v-for="producto in productos" :key="producto.id">
                <div class="col-6 col-md-4 col-lg-3">
                  <q-card
                    class="product-card cursor-pointer shadow-1"
                    @click="handleProductClick(producto)"
                    :class="{'bg-blue-1': isProductInCart(producto)}"
                  >
                    <div class="relative-position">
                      <q-img
                        :src="getImagenUrl(producto.imagen)"
                        style="height: 120px;"
                        class="product-image"
                      >
                        <template v-slot:error>
                          <div class="absolute-full flex flex-center bg-grey-3 text-grey-8">
                            <q-icon name="image" size="32px" />
                          </div>
                        </template>
                        <div class="absolute-top-right q-pa-xs">
                          <q-badge color="green" v-if="producto.stock > 0">
                            {{ producto.stock }} disp.
                          </q-badge>
                          <q-badge color="red" v-else>
                            Sin stock
                          </q-badge>
                        </div>
                      </q-img>

                      <div class="absolute-bottom bg-transparent">
                        <div class="text-caption text-center text-weight-bold text-white text-shadow q-px-xs">
                          {{ $filters.textUpper(producto.nombre) }}
                        </div>
                      </div>
                    </div>

                    <q-card-section class="q-pt-xs q-pb-sm">
                      <div class="row items-center justify-between">
                        <div class="text-caption text-grey-7">
                          {{ producto.unidad || 'Unidad' }}
                        </div>
                        <div class="text-h6 text-primary text-weight-bold">
                          {{ formatPrice(producto.precio) }} Bs
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </template>

              <div v-if="productos.length === 0" class="col-12 text-center q-py-xl">
                <q-icon name="search_off" size="48px" color="grey-5" />
                <div class="text-h6 text-grey-6 q-mt-sm">No se encontraron productos</div>
                <div class="text-caption text-grey-5">Intente con otro término de búsqueda</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Panel derecho - Carrito de venta -->
      <div class="col-12 col-md-5">
        <q-card class="shadow-1" flat bordered>
          <q-card-section class="bg-green text-white">
            <div class="row items-center">
              <div class="text-h6">Carrito de Venta</div>
              <q-space />
              <q-btn
                round dense flat
                icon="delete"
                color="white"
                @click="productosVentas = []; $q.notify({type: 'info', message: 'Carrito vaciado'})"
                title="Vaciar carrito"
              />
              <q-btn
                round dense flat
                icon="shopping_cart"
                color="white"
                class="q-ml-xs"
              >
                <q-badge floating color="red" rounded>{{ productosVentas.length }}</q-badge>
              </q-btn>
            </div>
          </q-card-section>

          <q-card-section>
            <!-- Resumen rápido -->
            <div class="row items-center q-mb-md" v-if="productosVentas.length > 0">
              <div class="col-6">
                <div class="text-subtitle1 text-weight-bold">Total:</div>
              </div>
              <div class="col-6 text-right">
                <div class="text-h5 text-primary text-weight-bold">
                  {{ formatPrice(totalVenta) }} Bs
                </div>
              </div>
            </div>

            <!-- Lista de productos en carrito -->
            <div class="cart-container" v-if="productosVentas.length > 0">
              <div class="scrollable-container">
                <div v-for="(item, index) in productosVentas" :key="index" class="cart-item q-mb-sm">
                  <q-card flat bordered>
                    <q-card-section class="q-pa-sm">
                      <div class="row items-center">
                        <!-- Imagen -->
                        <div class="col-3">
                          <q-img
                            :src="getImagenUrl(item.producto?.imagen)"
                            style="height: 60px; border-radius: 4px;"
                            class="item-image"
                          />
                        </div>

                        <!-- Información -->
                        <div class="col-7 q-pl-sm">
                          <div class="text-caption text-weight-bold text-truncate">
                            {{ $filters.textUpper(item.producto?.nombre) }}
                          </div>
                          <div class="text-caption text-grey-7">
                            Lote: {{ item.lote || 'N/A' }}
                          </div>
                          <div class="row items-center q-mt-xs">
                            <div class="col-6">
                              <q-input
                                v-model.number="item.cantidad"
                                type="number"
                                min="1"
                                dense
                                borderless
                                style="max-width: 70px;"
                                @update:model-value="updateSubtotal(item)"
                              >
                                <template #prepend>
                                  <q-icon name="numbers" size="xs" />
                                </template>
                              </q-input>
<!--                              input de precio-->
                              <q-input
                                v-model.number="item.precio"
                                type="number"
                                step="0.01"
                                min="0"
                                dense
                                borderless
                                style="max-width: 100px; margin-left: 8px;"
                                @update:model-value="updateSubtotal(item)"
                              >
                                <template #prepend>
                                  <q-icon name="attach_money" size="xs" />
                                </template>
                              </q-input>
                            </div>
                            <div class="col-6 text-right">
                              <div class="text-subtitle2 text-primary">
                                {{ formatPrice(item.precio * item.cantidad) }} Bs
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Acciones -->
                        <div class="col-2 text-center">
                          <q-btn
                            flat
                            round
                            dense
                            color="red"
                            icon="close"
                            size="sm"
                            @click="removeFromCart(index)"
                            title="Eliminar"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>

            <!-- Carrito vacío -->
            <div v-else class="text-center q-py-xl">
              <q-icon name="shopping_cart" size="64px" color="grey-4" />
              <div class="text-h6 text-grey-6 q-mt-sm">Carrito vacío</div>
              <div class="text-caption text-grey-5">Agregue productos desde el panel izquierdo</div>
            </div>

            <!-- Acciones -->
            <div class="q-mt-lg">
              <q-btn
                label="Procesar Venta"
                color="positive"
                icon="point_of_sale"
                class="full-width"
                size="lg"
                no-caps
                :loading="loading"
                :disable="productosVentas.length === 0"
                @click="clickDialogVenta"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Diálogo de confirmación de venta -->
    <q-dialog v-model="ventaDialog" maximized transition-show="slide-up" transition-hide="slide-down">
      <q-card class="full-height">
        <q-card-section class="row items-center q-pb-none bg-primary text-white">
          <div class="text-h5">Confirmar Venta</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="ventaDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-lg">
            <!-- Datos del cliente -->
            <div class="col-12 col-md-4">
              <q-card flat bordered>
                <q-card-section class="bg-blue-grey-1">
                  <div class="text-h6">Datos del Cliente</div>
                </q-card-section>
                <q-card-section>
                  <q-form>
                    <div class="row q-col-gutter-sm">
                      <div class="col-12">
                        <q-input
                          v-model="venta.nit"
                          outlined
                          dense
                          label="CI/NIT *"
                          @update:model-value="searchCliente"
                          :debounce="500"
                          :rules="[val => !!val || 'Campo requerido']"
                        >
                          <template #prepend>
                            <q-icon name="badge" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="venta.nombre"
                          outlined
                          dense
                          label="Nombre *"
                          :rules="[val => !!val || 'Campo requerido']"
                        >
                          <template #prepend>
                            <q-icon name="person" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="venta.email"
                          outlined
                          dense
                          label="Email"
                          type="email"
                        >
                          <template #prepend>
                            <q-icon name="email" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-select
                          v-model="venta.codigoTipoDocumentoIdentidad"
                          outlined
                          dense
                          label="Tipo de documento"
                          :options="codigoTipoDocumentoIdentidades"
                          emit-value
                          map-options
                        >
                          <template #prepend>
                            <q-icon name="description" />
                          </template>
                        </q-select>
                      </div>
                      <div class="col-12">
                        <q-input
                          v-model="venta.complemento"
                          outlined
                          dense
                          label="Complemento"
                        >
                          <template #prepend>
                            <q-icon name="info" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-select
                          v-model="venta.tipo_pago"
                          outlined
                          dense
                          label="Tipo de pago *"
                          :options="['Efectivo', 'QR']"
                          :rules="[val => !!val || 'Campo requerido']"
                        >
                          <template #prepend>
                            <q-icon name="payments" />
                          </template>
                        </q-select>
                      </div>
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>

            <!-- Detalles de la venta -->
            <div class="col-12 col-md-8">
              <q-card flat bordered>
                <q-card-section class="bg-blue-grey-1">
                  <div class="row items-center">
                    <div class="text-h6">Detalles de la Venta</div>
                    <q-space />
                    <div class="text-h5 text-primary text-weight-bold">
                      Total: {{ formatPrice(totalVenta) }} Bs
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="scrollable-table">
                    <q-markup-table dense flat bordered class="no-shadow">
                      <thead class="bg-grey-3">
                      <tr>
                        <th class="text-left">Producto</th>
                        <th class="text-center">Lote</th>
                        <th class="text-center">Vence</th>
                        <th class="text-center">Cant.</th>
                        <th class="text-right">Precio Unit.</th>
                        <th class="text-right">Subtotal</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item, index) in productosVentas" :key="index">
                        <td>
                          <div class="row items-center">
                            <q-img
                              :src="getImagenUrl(item.producto?.imagen)"
                              style="width: 40px; height: 40px; border-radius: 4px;"
                              class="q-mr-sm"
                            />
                            <div class="text-caption">
                              {{ $filters.textUpper(item.producto?.nombre || '') }}
                            </div>
                          </div>
                        </td>
                        <td class="text-center">{{ item.lote || '—' }}</td>
                        <td class="text-center">{{ item.fecha_vencimiento || '—' }}</td>
                        <td class="text-center">{{ item.cantidad }}</td>
                        <td class="text-right">{{ formatPrice(item.precio) }} Bs</td>
                        <td class="text-right text-weight-bold">
                          {{ formatPrice(item.precio * item.cantidad) }} Bs
                        </td>
                      </tr>
                      </tbody>
                      <tfoot class="bg-grey-2">
                      <tr>
                        <td colspan="4" class="text-right text-h6">TOTAL</td>
                        <td colspan="2" class="text-right text-h5 text-primary text-weight-bold">
                          {{ formatPrice(totalVenta) }} Bs
                        </td>
                      </tr>
                      <tr v-if="venta.tipo_pago === 'Efectivo'">
                        <td colspan="4" class="text-right text-h6">Efectivo Recibido</td>
                        <td colspan="2" class="text-right">
                          <q-input
                            v-model.number="efectivo"
                            type="number"
                            step="0.01"
                            min="0"
                            dense
                            outlined
                            style="max-width: 150px; float: right;"
                            @update:model-value="calculateChange"
                          />
                        </td>
                      </tr>
                      <tr v-if="venta.tipo_pago === 'Efectivo'">
                        <td colspan="4" class="text-right text-h6">Cambio</td>
                        <td colspan="2" class="text-right text-h5 text-green text-weight-bold">
                          {{ formatPrice(cambio) }} Bs
                        </td>
                      </tr>
                      </tfoot>
                    </q-markup-table>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md bg-grey-2">
          <q-btn
            label="Cancelar"
            color="grey"
            @click="ventaDialog = false"
            no-caps
            class="q-px-lg"
          />
          <q-btn
            label="Confirmar Venta"
            color="positive"
            icon="check"
            @click="submitVenta"
            :loading="loading"
            no-caps
            class="q-px-lg"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de selección de lote -->
    <q-dialog v-model="loteDialog" persistent>
      <q-card style="max-width: 800px; width: 90vw">
        <q-card-section class="row items-center q-pb-none bg-primary text-white">
          <div class="text-h6">Seleccionar Lote</div>
          <q-space />
          <q-btn flat round dense icon="close" @click="loteDialog = false" />
        </q-card-section>

        <q-card-section>
          <div class="q-mb-md">
            <div class="text-subtitle1 text-weight-bold">
              Producto: {{ $filters.textUpper(loteProducto?.nombre || '') }}
            </div>
            <div class="text-caption text-grey-7">
              Precio: {{ formatPrice(loteProducto?.precio) }} Bs
            </div>
          </div>

          <q-markup-table dense flat bordered class="no-shadow" v-if="lotes.length > 0">
            <thead class="bg-grey-3">
            <tr>
              <th class="text-center">#</th>
              <th class="text-left">Lote</th>
              <th class="text-center">Vencimiento</th>
              <th class="text-center">Días Restantes</th>
              <th class="text-center">Disponible</th>
              <th class="text-center">Acción</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(l, i) in lotes" :key="l.id">
              <td class="text-center">{{ i + 1 }}</td>
              <td class="text-left">{{ l.lote || 'N/A' }}</td>
              <td class="text-center">{{ l.fecha_vencimiento || '—' }}</td>
              <td class="text-center">
                <q-badge :color="getDaysColor(l.fecha_vencimiento)">
                  {{ getDaysRemaining(l.fecha_vencimiento) }}
                </q-badge>
              </td>
              <td class="text-center">
                <q-badge :color="l.disponible > 0 ? 'green' : 'red'">
                  {{ l.disponible }}
                </q-badge>
              </td>
              <td class="text-center">
                <q-btn
                  size="sm"
                  color="primary"
                  label="Seleccionar"
                  no-caps
                  @click="onPickLote(l)"
                  :disable="l.disponible <= 0"
                />
              </td>
            </tr>
            </tbody>
          </q-markup-table>

          <div v-else class="text-center q-py-xl">
            <q-icon name="inventory_2" size="48px" color="grey-5" />
            <div class="text-h6 text-grey-6 q-mt-sm">No hay lotes disponibles</div>
          </div>

          <div v-if="loteSelected" class="q-mt-lg">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle2 q-mb-sm">Configurar cantidad y precio</div>
                <div class="row ">
                  <div class="col-12 col-md-4">
                    <q-input
                      v-model.number="loteCantidad"
                      type="number"
                      dense outlined
                      label="Cantidad"
                      :min="1"
                      :max="Number(loteSelected.disponible || 0)"
                      :rules="[
                        val => val >= 1 || 'Mínimo 1',
                        val => val <= loteSelected.disponible || `Máximo ${loteSelected.disponible}`
                      ]"
                    >
                      <template #prepend>
                        <q-icon name="numbers" />
                      </template>
                    </q-input>
                    <q-input
                      v-model.number="lotePrecio"
                      type="number"
                      step="0.01"
                      dense outlined
                      label="Precio"
                      :model-value="lotePrecio"
                      @update:model-value="val => lotePrecio = val"
                    >
                      <template #prepend>
                        <q-icon name="attach_money" />
                      </template>
                    </q-input>
                  </div>
<!--                  <div class="col-12 col-md-4">-->
<!--                  </div>-->
                  <div class="col-12 col-md-4 text-center">
                    <div class="text-caption text-grey-7 q-mb-xs">Subtotal</div>
                    <div class="text-h6 text-primary text-weight-bold">
                      {{ formatPrice(loteCantidad * lotePrecio) }} Bs
                    </div>
                  </div>
                </div>

                <div class="row q-mt-md">
                  <q-space />
                  <q-btn
                    label="Cancelar"
                    color="grey"
                    @click="loteDialog = false"
                    no-caps
                    class="q-mr-sm"
                  />
                  <q-btn
                    color="primary"
                    icon="add_shopping_cart"
                    label="Agregar al carrito"
                    no-caps
                    @click="confirmarLote"
                    :loading="loading"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { Imprimir } from "src/addons/Imprimir";

export default {
  name: "VentasNew",
  data() {
    return {
      codigoTipoDocumentoIdentidades: [
        { value: 1, label: 'CI - CEDULA DE IDENTIDAD' },
        { value: 2, label: 'CEX - CEDULA DE IDENTIDAD DE EXTRANJERO' },
        { value: 5, label: 'NIT - NÚMERO DE IDENTIFICACIÓN TRIBUTARIA' },
        { value: 3, label: 'PAS - PASAPORTE' },
        { value: 4, label: 'OD - OTRO DOCUMENTO DE IDENTIDAD' },
      ],
      loading: false,
      ventaDialog: false,
      efectivo: '',
      venta: {
        nit: "0",
        nombre: "SN",
        codigoTipoDocumentoIdentidad: 1,
        tipo_venta: "Interno",
        tipo_pago: "Efectivo",
        complemento: "",
        email: ""
      },
      pagination: {
        page: 1,
        rowsPerPage: 24,
        rowsNumber: 0,
      },
      receta_id: null,
      recognition: null,
      activeField: null,
      productos: [],
      productosSearch: "",
      productosVentas: [],
      loteDialog: false,
      lotesLoading: false,
      lotes: [],
      loteSelected: null,
      loteCantidad: 1,
      lotePrecio: 0,
      loteProducto: null,
    };
  },
  computed: {
    totalVenta() {
      return this.productosVentas.reduce(
        (acc, it) => acc + (Number(it.cantidad) * Number(it.precio)), 0
      );
    },
    cambio() {
      const efectivoNum = Number(this.efectivo) || 0;
      const cambio = efectivoNum - this.totalVenta;
      return cambio > 0 ? cambio : 0;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.inputBuscarProducto?.focus();
    });
    this.productosGet();

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = "es-ES";
      this.recognition.interimResults = false;
      this.recognition.continuous = false;
      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (this.activeField) this.venta[this.activeField] += text;
      };
      this.recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
      };
    }
  },
  methods: {
    getImagenUrl(imagenNombre) {
      return `${this.$url}../images/${imagenNombre}`;
    },
    formatPrice(value) {
      const num = Number(value) || 0;
      return parseFloat(num.toFixed(2));
    },
    getDaysRemaining(fecha) {
      if (!fecha) return 'N/A';
      const today = new Date();
      const vencimiento = new Date(fecha);
      const diffTime = vencimiento - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays + ' días';
    },
    getDaysColor(fecha) {
      if (!fecha) return 'grey';
      const today = new Date();
      const vencimiento = new Date(fecha);
      const diffTime = vencimiento - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) return 'red';
      if (diffDays <= 30) return 'orange';
      return 'green';
    },
    isProductInCart(producto) {
      return this.productosVentas.some(item => item.producto_id === producto.id);
    },
    handleProductClick(producto) {
      if (producto.stock <= 0) {
        this.$q.notify({
          type: 'warning',
          message: 'Producto sin stock disponible',
          timeout: 2000
        });
        return;
      }
      this.openLoteDialog(producto);
    },
    removeFromCart(index) {
      this.$q.dialog({
        title: 'Confirmar',
        message: '¿Eliminar producto del carrito?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.productosVentas.splice(index, 1);
        this.$q.notify({
          type: 'info',
          message: 'Producto eliminado del carrito',
          timeout: 1500
        });
      });
    },
    updateSubtotal(item) {
      if (item.cantidad < 1) item.cantidad = 1;
      return item.precio * item.cantidad;
    },
    async openLoteDialog(producto) {
      this.loteProducto = producto;
      this.loteDialog = true;
      this.lotes = [];
      this.lotesLoading = true;

      try {
        const res = await this.$axios.get(`productos/${producto.id}/historial-compras-ventas`);
        this.lotes = res.data || [];

        // Si solo hay un lote disponible, lo seleccionamos automáticamente
        if (this.lotes.length === 1) {
          const lote = this.lotes[0];
          this.onPickLote(lote);

          // Si el lote tiene suficiente stock, lo agregamos directamente
          if (lote.disponible > 0) {
            // Usar el precio del producto como predeterminado
            this.lotePrecio = Number(producto.precio) || 0;
            this.loteCantidad = 1;

            // Podemos preguntar si quiere agregarlo directamente
            this.$q.dialog({
              title: 'Lote único disponible',
              message: `¿Agregar automáticamente el producto al carrito?\nLote: ${lote.lote || 'N/A'}\nDisponible: ${lote.disponible}`,
              cancel: true,
              persistent: true,
              ok: {
                label: 'Agregar',
                color: 'primary'
              },
              cancel: {
                label: 'Cancelar',
                color: 'grey'
              }
            }).onOk(() => {
              this.confirmarLote();
            });
          }
        }
      } catch (e) {
        console.error(e);
        this.$q.notify({
          type: 'negative',
          message: 'No se pudieron cargar los lotes',
          timeout: 3000
        });
      } finally {
        this.lotesLoading = false;
      }
    },
    onPickLote(lote) {
      this.loteSelected = lote;
      // Usar el precio del producto como predeterminado
      this.lotePrecio = Number(this.loteProducto?.precio) || 0;
      this.loteCantidad = 1;
    },
    confirmarLote() {
      if (!this.loteSelected) {
        this.$q.notify({
          type: 'warning',
          message: 'Selecciona un lote',
          timeout: 2000
        });
        return;
      }

      const disp = Number(this.loteSelected.disponible || 0);
      const cant = Number(this.loteCantidad || 0);
      const precio = Number(this.lotePrecio || 0);

      if (cant <= 0) {
        this.$q.notify({
          type: 'negative',
          message: 'La cantidad debe ser mayor a 0',
          timeout: 2000
        });
        return;
      }

      if (cant > disp) {
        this.$q.notify({
          type: 'negative',
          message: `Cantidad excede el disponible (${disp})`,
          timeout: 3000
        });
        return;
      }

      if (precio <= 0) {
        this.$q.notify({
          type: 'negative',
          message: 'El precio debe ser mayor a 0',
          timeout: 2000
        });
        return;
      }

      // Verificar si ya existe en el carrito
      const existingIndex = this.productosVentas.findIndex(
        item => item.compra_detalle_id === this.loteSelected.id
      );

      if (existingIndex >= 0) {
        // Actualizar cantidad si ya existe
        this.productosVentas[existingIndex].cantidad += cant;
        this.$q.notify({
          type: 'info',
          message: 'Cantidad actualizada en el carrito',
          timeout: 2000
        });
      } else {
        // Agregar nuevo item
        this.productosVentas.push({
          producto_id: this.loteProducto.id,
          cantidad: cant,
          precio: precio,
          producto: this.loteProducto,
          compra_detalle_id: this.loteSelected.id,
          lote: this.loteSelected.lote,
          fecha_vencimiento: this.loteSelected.fecha_vencimiento,
        });

        this.$q.notify({
          type: 'positive',
          message: 'Producto agregado al carrito',
          icon: 'check',
          timeout: 1500
        });
      }

      // Cerrar y limpiar
      this.loteDialog = false;
      this.loteSelected = null;
      this.loteProducto = null;
      this.loteCantidad = 1;
      this.lotePrecio = 0;
    },
    searchCliente() {
      this.loading = true;
      this.$axios.post("searchCliente", { nit: this.venta.nit })
        .then((res) => {
          this.venta.nombre = "SN";
          this.venta.email = "";
          this.venta.codigoTipoDocumentoIdentidad = 1;
          if (res.data.nombre) this.venta.nombre = res.data.nombre;
          if (res.data.email) this.venta.email = res.data.email;
          if (res.data.codigoTipoDocumentoIdentidad) this.venta.codigoTipoDocumentoIdentidad = parseInt(res.data.codigoTipoDocumentoIdentidad);
          if (res.data.complemento) this.venta.complemento = res.data.complemento;
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false));
    },
    clickDialogVenta() {
      if (this.productosVentas.length === 0) {
        this.$q.notify({
          type: 'warning',
          message: 'Debe agregar al menos un producto a la venta',
          timeout: 3000
        });
        return;
      }

      // Verificar que todos los productos tengan precio
      const productosSinPrecio = this.productosVentas.filter(item => !item.precio || item.precio <= 0);
      if (productosSinPrecio.length > 0) {
        this.$q.notify({
          type: 'negative',
          message: 'Todos los productos deben tener un precio válido',
          timeout: 3000
        });
        return;
      }

      this.ventaDialog = true;
      this.efectivo = '';
    },
    productosGet() {
      this.loading = true;
      this.$axios.get("productosStock", {
        params: {
          search: this.productosSearch,
          page: this.pagination.page,
          per_page: this.pagination.rowsPerPage,
        },
      }).then((res) => {
        this.productos = res.data.data;
        this.pagination.rowsNumber = res.data.total;
        this.pagination.page = res.data.current_page;

        // Escaneo por código de barras
        if (this.productos.length === 1 && this.productos[0].barra === this.productosSearch) {
          this.openLoteDialog(this.productos[0]);
          this.productosSearch = "";
        }
      }).catch((error) => {
        console.error(error);
        this.$q.notify({
          type: 'negative',
          message: 'Error al cargar productos',
          timeout: 3000
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    submitVenta() {
      // Validar cliente
      if (!this.venta.nit || this.venta.nit.trim() === '') {
        this.$q.notify({
          type: 'warning',
          message: 'El CI/NIT es requerido',
          timeout: 3000
        });
        return;
      }

      this.loading = true;
      this.$axios.post("ventas", {
        ci: this.venta.nit,
        nombre: this.venta.nombre,
        email: this.venta.email,
        codigoTipoDocumentoIdentidad: this.venta.codigoTipoDocumentoIdentidad,
        complemento: this.venta.complemento,
        productos: this.productosVentas,
        tipo_venta: this.venta.tipo_venta,
        tipo_pago: this.venta.tipo_pago,
        receta_id: this.receta_id,
      }).then((res) => {
        this.ventaDialog = false;
        this.$q.notify({
          type: 'positive',
          message: 'Venta realizada con éxito',
          icon: 'check',
          timeout: 3000
        });

        // Imprimir factura
        Imprimir.printFactura(res.data);

        // Resetear formulario
        this.productosVentas = [];
        this.venta = {
          nit: "0",
          nombre: "SN",
          codigoTipoDocumentoIdentidad: 1,
          tipo_venta: "Interno",
          tipo_pago: "Efectivo",
          complemento: "",
          email: ""
        };
        this.receta_id = null;

        // Refrescar productos
        this.productosGet();
        this.$nextTick(() => this.$refs.inputBuscarProducto?.focus());
      }).catch((error) => {
        console.error(error);
        const errorMsg = error?.response?.data?.message || "No se pudo realizar la venta";
        this.$q.notify({
          type: 'negative',
          message: errorMsg,
          timeout: 5000
        });
      }).finally(() => {
        this.loading = false;
      });
    },
    calculateChange() {
      // Esta función se llama automáticamente cuando cambia el efectivo
      return;
    },
    startRecognition(field) {
      if (this.recognition) {
        this.activeField = field;
        this.recognition.start();
      } else {
        this.$q.notify({
          type: 'warning',
          message: "El reconocimiento de voz no está disponible",
          timeout: 3000
        });
      }
    },
  }
};
</script>

<style scoped>
.search-input {
  border-radius: 8px;
}

.product-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.product-image {
  object-fit: cover;
}

.cart-container {
  max-height: 400px;
}

.scrollable-container {
  max-height: 350px;
  overflow-y: auto;
  padding-right: 4px;
}

.scrollable-container::-webkit-scrollbar {
  width: 6px;
}

.scrollable-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.scrollable-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.cart-item {
  transition: all 0.2s;
  border-radius: 6px;
}

.cart-item:hover {
  background-color: #f8f9fa;
}

.item-image {
  border: 1px solid #e0e0e0;
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
}

.scrollable-table {
  max-height: 400px;
  overflow-y: auto;
}

.no-shadow {
  box-shadow: none !important;
}
</style>
