const initialState = {
  alphabets: [
    {
      symbol: 'ก',
      reading: 'ko kai',
      meaningEng: 'chicken',
      initial: 'k',
      final: 'k'
    },
    {
      symbol: 'ข',
      reading: 'kho khai',
      meaningEng: 'egg',
      initial: 'kh',
      final: 'k'
    }
  ],
  selectedIndex: undefined
};

export default function(state= initialState, action) {
/*
  if (action.type === SET_INDEX) {
    return {
      ...state,
      selectedIndex: action.payload
    };
  }
  */
  return state;
}
