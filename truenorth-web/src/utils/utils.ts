export const isObjectIsEmpty = (obj: object) => {
    return !obj || Object.keys(obj).length === 0
}

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatNumberWithCommas = (value: number) => {
    if (!value) {
        throw new Error("Number value is null.")
    }
    return value.toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


export const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const MAX_FILE_SIZE = 10485760;

export const AVATAR_SUPPORTED_FORMATS = [
    "image/png",
    "image/jpg",
    "image/jpeg",
];

export const SUPPORTED_FORMATS = [
    "video/mp4",
    "video/mp3",
    "video/ogg",
    "video/webm",
    "video/3gpp",
    "video/3gpp2",
    "audio/mpeg",
    "audio/mp4",
    "audio/ogg",
    "audio/3gpp",
    "audio/wav",
    "audio/3gpp2",
    "audio/webm",
    "audio/mp3",
];

export const isVideo = (fileType: string) => {
    return fileType.startsWith("video");
}


export const validateClassFile = (file: File) => {
    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            return false;
        }
        if (!SUPPORTED_FORMATS.includes(file.type)) {
            return false
        }
    }
    return true;
}

export const validateAvatarFileSize = (file: File) => {
    if (Object.prototype.toString.call(file) === '[object File]') {
        if (file.size > MAX_FILE_SIZE) {
            return false;
        }
    }
    return true;
}

export const validateAvatarFileFormat = (file: File) => {
    if (Object.prototype.toString.call(file) === '[object File]') {
        if (!AVATAR_SUPPORTED_FORMATS.includes(file.type)) {
            return false
        }
    }
    return true;
}

export const randomPassword = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}