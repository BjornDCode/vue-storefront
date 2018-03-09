import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import VueApollo from 'vue-apollo';
import gql from 'graphql-tag';

import productsModule from './modules/products';
import collectionsModule from './modules/collections';
import cartModule from './modules/cart';

import BaseProductsView from './views/BaseProductsView';
import ProductsView from './views/ProductsView';
import ProductView from './views/ProductView';
import CollectionView from './views/CollectionView';
import CartView from './views/CartView';
import TagView from './views/TagView';
import VendorView from './views/VendorView';
import ProductTypeView from './views/ProductTypeView';

import ProductCard from './components/product/ProductCard';
import ProductList from './components/product/ProductList';

import Product from './components/product/Product';
import ProductDescription from './components/product/ProductDescription';
import ProductActions from './components/product/ProductActions';
import ProductPrice from './components/product/ProductPrice';
import ProductTags from './components/product/ProductTags';

import ProductOptions from './components/product/ProductOptions';
import ProductOptionsRadio from './components/product/ProductOptionsRadio';
import ProductOptionsSelect from './components/product/ProductOptionsSelect';

import ProductTabs from './components/product/ProductTabs';
import ProductTab from './components/product/ProductTab';

import ProductImages from './components/product/ProductImages';
import ProductImagesGallery from './components/product/ProductImagesGallery';
import ProductImagesSlider from './components/product/ProductImagesSlider';

import Cart from './components/cart/Cart';
import CartLink from './components/cart/CartLink'; 

import Price from './components/utilities/Price';
import Error from './components/utilities/Error';
import Loader from './components/utilities/Loader';
import Pagination from './components/utilities/Pagination';
import PaginationCollection from './components/utilities/PaginationCollection';

let Storefront = {

    install(Vue, options) {

        Vue.prototype.$event = new Vue();

        // const cache = new InMemoryCache();

        // persistCache({ cache, storage: window.localStorage });

        options.persistor.then(() => {

            const httpLink = new HttpLink({
                uri: `${options.domain}/api/graphql`,
                headers: {
                    'X-Shopify-Storefront-Access-Token': options.storefrontAccessToken
                }
            });

            const apolloClient = new ApolloClient({
                link: httpLink,
                cache: options.cache,
                connectToDevTools: true
            });

            Vue.use(VueApollo)

            const apolloProvider = new VueApollo({
                defaultClient: apolloClient
            });

            Vue.provider = function() {
                return apolloProvider.provide();
            }

            console.log('plugin')

        }); // End of promise

        
        Vue.component('sf-base-products-view', BaseProductsView);

        Vue.component('sf-product-card', ProductCard);
        Vue.component('sf-product-list', ProductList);

        Vue.component('sf-product', Product);
        Vue.component('sf-product-description', ProductDescription);
        Vue.component('sf-product-actions', ProductActions);
        Vue.component('sf-product-price', ProductPrice);
        Vue.component('sf-product-tags', ProductTags);

        Vue.component('sf-product-options', ProductOptions);
        Vue.component('sf-product-options-radio', ProductOptionsRadio);
        Vue.component('sf-product-options-select', ProductOptionsSelect);

        Vue.component('sf-product-tabs', ProductTabs);
        Vue.component('sf-product-tab', ProductTab);

        Vue.component('sf-product-images', ProductImages);
        Vue.component('sf-product-images-gallery', ProductImagesGallery);
        Vue.component('sf-product-images-slider', ProductImagesSlider);

        Vue.component('sf-cart', Cart);
        Vue.component('sf-cart-link', CartLink);

        Vue.component('sf-price', Price);
        Vue.component('sf-error', Error);
        Vue.component('sf-loader', Loader);
        Vue.component('sf-pagination', Pagination);
        Vue.component('sf-pagination-collection', PaginationCollection);

        if (options.router) {
            const routes = [
                { path: '/products', component: ProductsView },
                { path: '/product/:handle', component: ProductView },
                { path: '/collection/:handle', component: CollectionView },
                { path: '/tag/:handle', component: TagView },
                { path: '/vendor/:handle', component: VendorView },
                { path: '/type/:handle', component: ProductTypeView },
                { path: '/cart', component: CartView }
            ];

            options.router.addRoutes(routes);
        }

        // return new Promise(function(resolve, reject) {
        //     setTimeout(() => {
        //       resolve('success')
        //     }, 2000)
        // })

    }

    

};


export default Storefront;
