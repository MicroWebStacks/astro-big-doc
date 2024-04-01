import {relAssetToUrl} from '@/libs/assets.js'
import {get_dir_files} from '@/libs/utils.js'
import yaml from 'js-yaml'
import {extname,join} from 'path'
import sharp from 'sharp';
import { config } from '@/config'

const getFilenameWithoutExtension = (fullPath) => {
    fullPath = fullPath.replaceAll("\\","/")
    const startIndex = fullPath.lastIndexOf('/') + 1;
    const filenameWithExtension = fullPath.substring(startIndex);
    const extensionIndex = filenameWithExtension.lastIndexOf('.');
  
    if (extensionIndex <= 0) {
      return filenameWithExtension;
    }
  
    return filenameWithExtension.substring(0, extensionIndex);
}

async function yaml_to_grid_images(code,dirpath){
    let relImages = []
    const data = yaml.load(code)
    if(Array.isArray(data)){
        relImages = data
    }else{
        if(Object.hasOwn(data,"dir")){
            relImages = await get_dir_files(dirpath,data.dir)
        }
    }
    let imagesUrls = []
    for(const relFile of relImages){
        const abs_file = join(config.content_path,dirpath,relFile)
        const image = sharp(abs_file);
        const metadata = await image.metadata();
        let width = metadata.width
        let height = metadata.height
        if (metadata.orientation >= 5 && metadata.orientation <= 8) {
            [width, height] = [height, width]; // Swap width and height
        }
        const aspectRatio = width / height
        let spanWidth = 1, spanHeight = 1
        if(aspectRatio > 1) { // Wider image
            spanWidth = Math.round(aspectRatio) // Adjust this logic as per your grid layout needs
        } else if(aspectRatio < 1) { // Taller image
            spanHeight = Math.round(1 / aspectRatio) // Adjust this logic as per your grid layout needs
        }
        //console.log(`${relFile} : width ${width} ; height ${height}; ratio ${aspectRatio} ; span ${spanWidth} / ${spanHeight}`)
        const url = await relAssetToUrl(relFile,dirpath)
        imagesUrls.push({
            url,
            ext:extname(url).toLowerCase(),
            name:getFilenameWithoutExtension(relFile),
            width,
            height,
            spanWidth,
            spanHeight,
            ratio:aspectRatio
        })
    }
    return imagesUrls
}

function select_masonry(imageUrls){
    const countGreaterOrEqualOne = imageUrls.filter(item => item.ratio >= 1).length;
    return countGreaterOrEqualOne > imageUrls.length / 2;
}

export {
    yaml_to_grid_images,
    select_masonry
}
