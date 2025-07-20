import packageJson from '../../package.json';
import themes from '../../themes.json';
import { history } from '../stores/history';
import { theme } from '../stores/theme';

const hostname = "tau-cp";

function normalizeTurkishChars(str: string): string {
  return str
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/Ç/g, 'C')
    .replace(/Ğ/g, 'G')
    .replace(/İ/g, 'I')
    .replace(/Ö/g, 'O')
    .replace(/Ş/g, 'S')
    .replace(/Ü/g, 'U');
}

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  yardım: () => `
    Kullanılabilir komutlar:

      TAÜ CP:

        cp         - Competitive programming nedir?
        öğren      - CP yeteneklerini geliştir!
        hakkımızda - Biz kimiz?
        whatsapp   - WhatsApp grubumuza katıl!
        sosyal     - Sosyal medya hesaplarımız burada.
        mail       - Bize mail gönder!

      GENEL:

        whoami, hostname, tarih, hava, vi, vim, emacs, sudo, echo, tema, repo,
        temizle, çıkış, banner
      

    `,
  hostname: () => hostname,
  whoami: () => 'Yeni üyemiz!',
  cp: () => `
    Competitive programming (yarışmacı programlama), algoritma ve problem çözme yeteneklerini 
    test eden bir yazılım dalıdır. Katılımcılar, belirli bir süre içinde çeşitli programlama 
    problemlerini çözmeye çalışırlar. Bu problemler genellikle matematiksel düşünme, algoritmalar, 
    veri yapıları ve optimizasyon bilgisi gerektirir.
    `,
  hakkımızda: () => `
    Türk-Alman Üniversitesi Competitive Programming Topluluğu olarak, algoritmalar ve problem çözme 
    tutkusunu paylaşan öğrencilerden oluşan dinamik bir ekibiz. Amacımız, yarışmacı programlama alanında 
    kendimizi geliştirirken bu alana ilgi duyan herkese destek olmak, bilgi paylaşımında bulunmak ve 
    birlikte öğrenme kültürünü yaygınlaştırmaktır. Düzenlediğimiz eğitimler, çalışma grupları ve katıldığımız 
    ulusal ve uluslararası yarışmalarla hem bireysel gelişimi hem de topluluk ruhunu ön planda tutuyoruz. 

    Yarışmacı programlamaya ilgi duyan herkese kapımız açık!
    `,
  öğren: (args: string[]) => {
    window.open('https://github.com/lnishan/awesome-competitive-programming');

    return `CP/DSA kaynakları derlemesine yönlendirildi.`;
  },
  whatsapp: (args: string[]) => {
    window.open('https://taucp.netlify.app/');

    return `WhatsApp davet sistemine yönlendirildi.`;
  },
  sosyal: () => `
    Sosyal medyadan bizi takip et!

    - Instagram: https://www.instagram.com/infxofficial/
    `,
  tarih: () => new Date().toLocaleString(),
  vi: () => `neden vi kullanasın ki? 'emacs'i dene!`,
  vim: () => `neden vim kullanasın ki? 'emacs'i dene!`,
  emacs: () => `neden emacs kullanasın ki? 'vim'i dene!`,
  echo: (args: string[]) => args.join(' '),
  sudo: (args: string[]) => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return `:)`;
  },
  tema: (args: string[]) => {
    const usage = `Kullanım: tema [argüman]
    [argüman]:
      listele: tüm temaları görüntüle
      set: [tema-ismi] temasını ayarla

    Örnekler:
      tema listele
      tema ayarla gruvbox
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case 'listele': {
        let result = themes.map((t) => t.name.toLowerCase()).join(', ');
        return result;
      }

      case 'ayarla': {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1];
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `'${selectedTheme}' teması bulunamadı.
          Lütfen mevcut temaları listelemek için 'tema listele' komutunu kullanın.`;
        }

        theme.set(t);

        return `${selectedTheme} teması ayarlandı.`;
      }

      default: {
        return usage;
      }
    }
  },
  repo: () => {
    window.open("https://github.com/egoistpizza/tau-cp-website");

    return "Repo'ya yönlendirildi!";
  },
  temizle: () => {
    history.set([]);

    return '';
  },
  mail: () => {
    window.open(`mailto:tau.compp@gmail.com`);

    return `tau.compp@gmail.com adresine yönlendirildiniz.`;
  },
  hava: async (args: string[]) => {
    const city = args.join('+');

    if (!city) {
      return 'Kullanım: hava [şehir]. Örneğin: Hava Adana';
    }

    const normalizedCity = normalizeTurkishChars(city);
    const weather = await fetch(`https://wttr.in/${normalizedCity}?ATm`);

    return weather.text();
  },
  çıkış: () => {
    return 'Çıkış yapmak için sekmeyi kapatınız.';
  },
  banner: () => `
                 ██    ██

████████  █████  ██    ██      ██████ ██████  
   ██    ██   ██ ██    ██     ██      ██   ██ 
   ██    ███████ ██    ██     ██      ██████  
   ██    ██   ██ ██    ██     ██      ██      
   ██    ██   ██  ██████       ██████ ██      
                                              
                                              
                                                                 
Kullanılabilir komutları görmek için "yardım" yazınız.
`,
};
