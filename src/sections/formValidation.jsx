// formValidation.js

// export const validateFormData = (formData, rules) => {
//   const errors = {};
//   Object.keys(rules).forEach((field) => {
//     const fieldRules = rules[field];
//     console.log(`Rules for ${field}:`, fieldRules);
//     fieldRules.forEach((rule) => {
//       const error = rule(formData[field]);
//       if (error) {
//         errors[field] = error;
//       }
//     });
//   });
//   return errors;
// };

export const validateFormData = (formData, rules) => {
  const errors = Array.isArray(formData) ? [] : {};

  if (Array.isArray(formData)) {
    formData.forEach((item, index) => {
      const itemErrors = {};
      Object.keys(rules).forEach((field) => {
        const fieldRules = rules[field];
        fieldRules.forEach((rule) => {
          const error = rule(item[field]);
          if (error) {
            itemErrors[field] = error;
          }
        });
      });

      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors; // Ghi lỗi theo index
      }
    });
  } else {
    Object.keys(rules).forEach((field) => {
      const fieldRules = rules[field];
      fieldRules.forEach((rule) => {
        const error = rule(formData[field]);
        if (error) {
          errors[field] = error;
        }
      });
    });
  }

  return errors;
};


// // Rule: Required
// export const isRequired = (fieldName) => (value) =>
//   !value ? `${fieldName} không được để trống` : '';

export const isRequired = (fieldName) => (value) =>
  value === null || value === undefined || value === '' ? `${fieldName} không được để trống` : '';


// Rule: Email
export const isEmail = (value) =>
  value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email không hợp lệ' : '';

// Rule: Phone
export const isPhone = (value) => {
  const phoneRegex = /^(84|0)([0-9]{9,10})$/; // Hỗ trợ cả mã vùng quốc tế (84) và nội địa (0)
  return value && !phoneRegex.test(value) ? 'Số điện thoại không hợp lệ' : '';
};

// Rule: Min Length
export const minLength = (fieldName, min) => (value) =>
  value && value.length < min
    ? `${fieldName} phải có ít nhất ${min} ký tự`
    : '';

// Rule: Max Length
export const maxLength = (fieldName, max) => (value) =>
  value && value.length > max
    ? `${fieldName} không được vượt quá ${max} ký tự`
    : '';
export const isValidPassword = (fieldName) => (value) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

  if (!value) {
    return `${fieldName} không được để trống`;
  }

  return !passwordRegex.test(value)
    ? `${fieldName} phải chứa ít nhất 5 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt`
    : '';
};

export const isValidPrice = (fieldName, min) => (value) => {
  const numericValue = Number(value); // Chuyển giá trị sang số
  if (Number.isNaN(numericValue)) {
    return `${fieldName} phải là một số hợp lệ`;
  }
  if (numericValue < min) {
    return `${fieldName} không được nhỏ hơn ${min}`;
  }
  return '';
};

export const validateArray = (fieldName, fieldRules) => (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return `${fieldName} không được để trống`;
  }

  for (let i = 0; i < array.length; i += 1) {
    const item = array[i];
    for (const field in fieldRules) {
      if (Object.prototype.hasOwnProperty.call(fieldRules, field)) {
        const error = fieldRules[field](item[field]);
        if (error) {
          console.log(error);
        }
      }
    }
  }

  return '';
};
export const isPositiveNumber = (fieldName) => (value) => {
  if (value === '' || value === null || value === undefined) {
    return `${fieldName} không được để trống`;
  }
  const numberValue = Number(value);
  if (Number.isNaN(numberValue) || !/^\d+$/.test(value)) {
    return `${fieldName} chỉ được nhập số nguyên dương`;
  }
  if (numberValue <= 0) {
    return `${fieldName} phải lớn hơn 0`;
  }
  return '';
};

export const isArrayNotEmpty = (fieldName) => (value) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return `${fieldName} không được để trống`;
  }
  return '';
};
