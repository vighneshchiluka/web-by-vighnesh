import {build} from 'esbuild';
import {mkdir,writeFile,rm,copyFile,cp,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {site,services} from '../src/config.js';
await rm('dist',{recursive:true,force:true});
await mkdir('dist/assets',{recursive:true});
await mkdir('.sites-runtime',{recursive:true});
await build({entryPoints:['src/App.jsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.sites-runtime/render.mjs',jsx:'automatic'});
await build({entryPoints:['src/client.jsx'],bundle:true,minify:true,outfile:'dist/assets/app.js',format:'esm',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'},target:['es2020']});
await writeFile('dist/assets/styles.css',(await readFile('src/styles.css','utf8'))+'\n'+(await readFile('src/dark.css','utf8')));
await copyFile('public/brand.svg','dist/assets/brand.svg');
await copyFile('public/og.svg','dist/assets/og.svg');
await cp('public/projects','dist/assets/projects',{recursive:true});
const {default:App}=await import('file:///'+resolve('.sites-runtime/render.mjs').replaceAll('\\','/'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const homepageDescription='Looking for a website designer in Mumbai? Web by Vighnesh creates modern, responsive and SEO-friendly websites for businesses, startups and professionals.';
const pages=[{path:'/',title:'Website Designer in Mumbai | Web by Vighnesh',description:homepageDescription},...services.map(s=>({path:'/services/'+s.slug+'/',title:s.name+' | Web by Vighnesh, Mumbai',description:s.description})),{path:'/privacy/',title:'Privacy Notice | Web by Vighnesh',description:'How Web by Vighnesh handles website enquiries and personal information.'},{path:'/404.html',title:'Page Not Found | Web by Vighnesh',description:'Return to Web by Vighnesh.'}];
for(const page of pages){const url=site.url+page.path;const schema={'@context':'https://schema.org','@graph':[{'@type':'ProfessionalService','@id':site.url+'/#business',name:site.name,url:site.url,description:homepageDescription,founder:{'@type':'Person',name:site.founder},address:{'@type':'PostalAddress',addressLocality:'Mumbai',addressRegion:'Maharashtra',addressCountry:'IN'},areaServed:[{'@type':'City',name:'Mumbai'},{'@type':'Country',name:'India'}],...(site.email?{email:site.email}:{}),...(site.whatsapp?{telephone:'+'+site.whatsapp}:{})},...(page.path.startsWith('/services/')?[{'@type':'Service',name:page.title.split(' | ')[0],url,description:page.description,provider:{'@id':site.url+'/#business'}}]:[])]};const html='<!doctype html><html lang="en-IN" data-path="'+page.path+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#222922"><title>'+escape(page.title)+'</title><meta name="description" content="'+escape(page.description)+'"><meta name="robots" content="'+(page.path==='/404.html'?'noindex,follow':'index,follow')+'"><link rel="canonical" href="'+url+'"><meta property="og:type" content="website"><meta property="og:site_name" content="Web by Vighnesh"><meta property="og:title" content="'+escape(page.title)+'"><meta property="og:description" content="'+escape(page.description)+'"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+site.url+'/assets/og.svg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+escape(page.title)+'"><meta name="twitter:description" content="'+escape(page.description)+'"><meta name="twitter:image" content="'+site.url+'/assets/og.svg"><link rel="icon" type="image/svg+xml" href="/assets/brand.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="/assets/styles.css"><script type="application/ld+json">'+JSON.stringify(schema).replaceAll('<','\\u003c')+'</script></head><body><div id="root">'+renderToString(React.createElement(App,{path:page.path}))+'</div><script type="module" src="/assets/app.js"></script></body></html>';const file=page.path.endsWith('.html')?'dist'+page.path:'dist'+page.path+'index.html';await mkdir(resolve(file,'..'),{recursive:true});await writeFile(file,html);}
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.filter(p=>p.path!=='/404.html').map(p=>'<url><loc>'+site.url+p.path+'</loc></url>').join('')+'</urlset>');
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: '+site.url+'/sitemap.xml\n');
console.log('Built '+pages.length+' SEO-rendered pages in dist/.');

