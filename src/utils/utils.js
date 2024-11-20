export const get_s3_image_url =  (path) => {
    return `${process.env.REACT_APP_S3_BUCKET_URL}${path}`;
}
