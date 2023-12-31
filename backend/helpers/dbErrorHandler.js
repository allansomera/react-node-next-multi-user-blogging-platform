const uniqueMessage = (error) => {
  let output
  try {
    //"E11000 duplicate key error collection: seoblog_db.categories index: slug_1 dup key: { slug: \"cat_two\" }"
    let code = error.code
    let slug = error.keyValue.slug
    let string_build = `E${code} duplicate key error: '${slug}' already exist`
    output = string_build
  } catch (ex) {
    output = 'Unique field already exists'
  }

  return output
}
exports.errorHandler = (error) => {
  let message = ''

  if (error.code) {
    switch (error.code) {
      case 11000:
        message = uniqueMessage(error)
        break
      default:
        message = 'Something went wrong'
    }
  }
  return message
}
