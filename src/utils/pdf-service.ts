import { Injectable } from '@nestjs/common';
import * as ejs from 'ejs';
import * as puppeteer from 'puppeteer';
import { v1 as uuidv1 } from 'uuid';
import * as path from 'path';
@Injectable()
export class PdfService {
  async createPdf(args: {
    fileName: string;
    options?: {};
    data?: {};
    isLandscape?;
    userCreated?;
  }) {
    try {
      const filePath = path.join(
        process.cwd(),
        'assets/templates',
        args.fileName,
      );
      if (!args.options) args.options = {};
      if (!args.data) args.data = {};
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.CHROME_BIN || null,
        args: ['--no-sandbox', '--headless', '--disable-gpu'],
      });
      const page = await browser.newPage();
      let html = await ejs.renderFile(filePath, args.data);

      await page.setContent(html);

      let pageNumber = '';
      if (args.userCreated != null) {
        pageNumber =
          '<span class="right"><span class="pageNumber"></span> of <span class="totalPages"></span></span>';
      }
      const buffer = await page.pdf({
        format: 'a4',
        printBackground: true,
        landscape: args.isLandscape,
        margin: {
          left: '10mm',
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
        },
        displayHeaderFooter: true,
        headerTemplate: '<div/>',
        footerTemplate: `
        <style>
          .left {float:left;font-size: 14px;}
          .right {float:right;font-size: 14px;}
          #footer {
            display: block;
            padding:5px
           }
        </style>
        <div id="footer">
        <span class="left">  ${args.userCreated ?? ''}</span>
        ${pageNumber}
        </div>
        `,
        ...args.options,
      });
      await browser.close();
      return buffer;
    } catch (e) {
      console.log(e);
    }
  }
  download(res, buffer) {
    let file_name = 'PDF' + uuidv1() + '.pdf';
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${file_name}`,
      'Content-Length': buffer?.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });
    res.end(buffer);
  }
}
