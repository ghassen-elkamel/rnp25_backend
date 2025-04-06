import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class StringToObjectPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return value;

    // If createUserDto is a string, parse it
    if (value.createUserDto && typeof value.createUserDto === 'string') {
      try {
        // Remove curly braces and split by comma
        const cleanStr = value.createUserDto.replace(/[{}]/g, '');
        const pairs = cleanStr.split(',').map(pair => pair.trim());
        
        // Convert to object
        value.createUserDto = pairs.reduce((obj, pair) => {
          const [key, val] = pair.split(':').map(item => item.trim());
          obj[key] = val;
          return obj;
        }, {});
      } catch (error) {
        throw new BadRequestException('Invalid createUserDto format');
      }
    }

    return value;
  }
} 