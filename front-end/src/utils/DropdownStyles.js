export const customStyles = {
  menu: (provided) => ({
    ...provided,
    background: '#b3b3b3'
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#acf39d' : '#b3b3b3',
    '&:active': {
      background: '#3cdd1b'
    },
    color: state.isFocused ? '#666666' : '#2d2d2d'
  }),
  valueContainer: (provided) => ({
    ...provided,
    color: '#2d2d2d'
  }),
  control: (provided, state) => ({
    ...provided,
    background: '#b3b3b3',
    boxShadow: state.isFocused ? '0px 0px 3px 1px #acf39d' : 'none',
    border: 0
  }),

  dropdownIndicator: () => ({
    color: '#2d2d2d',
    padding: 5
  }),
  singleValue: () => {
    const opacity = 0.5

    return { ...opacity }
  }
}
