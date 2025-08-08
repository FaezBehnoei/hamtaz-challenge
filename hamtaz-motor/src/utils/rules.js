export const rules = {
  required: (value) => {
    if (value && value.trim()) return true;
    return 'این فیلد الزامی است.';
  },
  isNumber: (value) => {
    if (!value || !isNaN(Number(value))) return true;
    return 'لطفاً یک عدد معتبر وارد کنید.';
  },
  minLength: (min) => (value) => {
    if (!value || value.length >= min) return true;
    return `حداقل ${min} کاراکتر مورد نیاز است.`;
  },
  hasLetterAndNumber: (value) => {
    const letterPattern = /[a-zA-Z]/;
    const numberPattern = /[0-9]/;
    if (letterPattern.test(value) && numberPattern.test(value)) return true;
    return 'رمز عبور باید شامل حروف و اعداد باشد.';
  }
};