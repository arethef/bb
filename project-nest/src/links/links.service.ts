import { Injectable } from '@nestjs/common';
import { Brand } from 'src/brands/entities/brand.entity';
import { ReqCreateLinkDto } from './dto/req-create-link.dto';
import { ReqDeleteLinkDto } from './dto/req-delete-link.dto';
import { Link } from './entities/link.entity';

@Injectable()
export class LinksService {
  async findLinksByBrandId(brandId: string): Promise<Link[]> {
    const brand: Brand = await Brand.findOne({
      where: { id: brandId },
    });
    const result = await Link.find({
      where: { brandId: brand.id },
    });
    return result;
  }

  async insertLinks(userId: string, dtos: ReqCreateLinkDto[]) {
    const brand: Brand = await Brand.findOne({
      where: { userId },
    });
    const result: Link[] = [];
    for (const dto of dtos) {
      const link: Link = new Link();
      link.brand = brand;
      link.brandId = brand.id;
      link.name = dto.name;
      link.url = dto.url;
      const linkResult = await Link.save(link);
      result.push(linkResult);
    }
    return result;
  }

  async deleteLinks(dtos: ReqDeleteLinkDto[]) {
    console.log(`++++++ [links.service.ts] deleteLinks() ++++++`);
    const result = [];
    for (let i = 0; i < dtos.length; i++) {
      console.log(`❯❯❯❯❯❯ [links.service.ts] deleteLinks() dtos[i]:`, dtos[i]);
      const deleteLinkResult = await Link.delete(dtos[i]);
      await Link.delete(dtos[i]);
      console.log(
        `❯❯❯❯❯❯ [links.service.ts] deleteLinks() deleteLinkResult:`,
        deleteLinkResult,
      );

      result.push(deleteLinkResult);

      // const removeLinkResult = await Link.remove(link);
      // console.log(
      //   `❯❯❯❯❯❯ [links.service.ts] deleteLinks() removeLinkResult:`,
      //   removeLinkResult,
      // );

      // result.push(removeLinkResult);
    }
    return result;
  }
}
