const handleErrorMessage = (response) => {
  const errArr = response.error;
  let errorMessage = '';

  errArr.forEach(errObj => {
    const fields = Object.keys(errObj);
    errorMessage = errorMessage + errObj[fields[0]] + '\n';
  });
  return errorMessage;
};

export default handleErrorMessage;
