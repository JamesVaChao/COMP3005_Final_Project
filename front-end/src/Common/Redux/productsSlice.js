const initialState = {
    productListCurrent : [],
    productListHistory : [],
    shouldRetrieveFromCache: true,
    hasRetrievedFromCache : false,
    availableProductId : 0,
    getAvailableProductId : function () { 
      return this.availableProductId++;
    }
}

/*
{type: "product/productListCurrent", payload: object}
{type: "product/productListHistory", payload: object}
{type: "product/productCurrentList/delete", payload: product.storageId}
*/

export default function productSlice(state = initialState, action) {
  switch (action.type) {
      case 'product/productListCurrent/replaceAll': {
        return {
            ...state,
            productListCurrent :  action.payload
            
        }
         
      }
      case 'product/productCurrentList/delete': {
        let newProductList = state.productListCurrent.filter(product => product.storageId !== action.payload);
        return {
            ...state,
            productListCurrent : {newProductList}
            
        }
      }
      case 'product/productListHistory/replaceAll': {
        return {
            ...state,
            productListHistory : action.payload
        }
      }
      case 'product/productListCurrent/add':{
        return {
          ...state,
          productListCurrent : [...state.productListCurrent, action.payload]
      }
      }
      case 'product/productListHistory/add':{
        return {
          ...state,
          productListHistory : [...state.productListHistory, action.payload]
      }
      }
      case 'product/productListHistory/pop':{
        let p = state.productListHistory
        p.pop();
        return {
          ...state,
          productListHistory : p
      }
      }
      case 'product/productListHistory/clear':{
        return {
          ...state,
          productListHistory : []
      }
      }
      case 'product/hasRetrievedFromCache': {
        return {
          ...state,
          hasRetrievedFromCache: true
        }
      }
      case 'product/availableProductId/update': {
        return {
          ...state,
          availableProductId: action.payload
        }
      }
      default:
        return state
    }
  }