import path from "path" ;
import ejs from 'ejs';

export const RenderTemplate = async(templateName:string,data:object):Promise<string>=>{

    const templatePath = path.join(process.cwd(),`src/templates/${templateName}.ejs`) ;

    try {
        
        const renderedContent = await ejs.renderFile(templatePath,data) ;
        return renderedContent ;
        
    } catch (error) {
        console.error('Error rendering template: ',error);
        throw error
    }
}