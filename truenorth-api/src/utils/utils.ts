export class Utils {
  static isEmpty = (value: any) => {
    return Object.keys(value).length > 0;
  };

  static formatErrors = (errors: any[]) => {
    return errors
      .map((error) => {
        for (const key in error.constraints) {
          return error.constraints[key];
        }
      })
      .join(", ");
  };

  static formatCurrency = (value: number) => {
    const formatter = Intl.NumberFormat("us-EN", { minimumFractionDigits: 2 });
    return formatter.format(value / 100);
  };

  static imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
      return callback(
        {
          statusCode: 400,
          message: "Only jpg,jpeg,png,pdf are allowed!",
          error: "Bad Request",
        },
        false
      );
      //return callback(new Error('Only jpg,jpeg,png,pdf are allowed!'), false);
    }
    callback(null, true);
  };
}


export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}