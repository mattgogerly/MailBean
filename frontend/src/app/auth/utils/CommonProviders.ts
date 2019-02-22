/**
 * Mozilla provide a database of common email providers and their relevant connection details as part of Thunderbird.
 * https://autoconfig.thunderbird.net/v1.1/
 *
 * The Mailspring project adapated this database into a JSON file which is much easier to handle in TypeScript than the XML provided
 * by Mozilla.
 * https://github.com/Foundry376/Mailspring/blob/master/app/internal_packages/onboarding/lib/mailspring-provider-settings.json
 * This file is adapated from the Mailspring version (some data that we don't need is removed).
 */

export const CommonProviders = {
  'startmail.com': {
    'display_name': 'startmail.com',
    'display_short_name': 'startmail.com',
    'imap_host': 'imap.startmail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.startmail.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'mail.com': {
    'display_name': 'mail.com',
    'display_short_name': 'mail.com',
    'imap_host': 'imap.mail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'mail.org': {
    'alias': 'mail.com'
  },
  'email.com': {
    'alias': 'mail.com'
  },
  'post.com': {
    'alias': 'mail.com'
  },
  'usa.com': {
    'alias': 'mail.com'
  },
  'accountant.com': {
    'alias': 'mail.com'
  },
  'consultant.com': {
    'alias': 'mail.com'
  },
  'dr.com': {
    'alias': 'mail.com'
  },
  'engineer.com': {
    'alias': 'mail.com'
  },
  'cheerful.com': {
    'alias': 'mail.com'
  },
  'techie.com': {
    'alias': 'mail.com'
  },
  'linuxmail.org': {
    'alias': 'mail.com'
  },
  'europe.com': {
    'alias': 'mail.com'
  },
  'london.com': {
    'alias': 'mail.com'
  },
  'uymail.com': {
    'alias': 'mail.com'
  },
  'myself.com': {
    'alias': 'mail.com'
  },
  'iname.com': {
    'alias': 'mail.com'
  },
  'writeme.com': {
    'alias': 'mail.com'
  },
  '2die4.com': {
    'alias': 'mail.com'
  },
  'activist.com': {
    'alias': 'mail.com'
  },
  'adexec.com': {
    'alias': 'mail.com'
  },
  'africamail.com': {
    'alias': 'mail.com'
  },
  'aircraftmail.com': {
    'alias': 'mail.com'
  },
  'alabama.usa.com': {
    'alias': 'mail.com'
  },
  'alaska.usa.com': {
    'alias': 'mail.com'
  },
  'allergist.com': {
    'alias': 'mail.com'
  },
  'alumni.com': {
    'alias': 'mail.com'
  },
  'alumnidirector.com': {
    'alias': 'mail.com'
  },
  'americamail.com': {
    'alias': 'mail.com'
  },
  'amorous.com': {
    'alias': 'mail.com'
  },
  'angelic.com': {
    'alias': 'mail.com'
  },
  'archaeologist.com': {
    'alias': 'mail.com'
  },
  'arizona.usa.com': {
    'alias': 'mail.com'
  },
  'artlover.com': {
    'alias': 'mail.com'
  },
  'asia-mail.com': {
    'alias': 'mail.com'
  },
  'atheist.com': {
    'alias': 'mail.com'
  },
  'australiamail.com': {
    'alias': 'mail.com'
  },
  'bartender.net': {
    'alias': 'mail.com'
  },
  'berlin.com': {
    'alias': 'mail.com'
  },
  'bigger.com': {
    'alias': 'mail.com'
  },
  'bikerider.com': {
    'alias': 'mail.com'
  },
  'birdlover.com': {
    'alias': 'mail.com'
  },
  'blader.com': {
    'alias': 'mail.com'
  },
  'boardermail.com': {
    'alias': 'mail.com'
  },
  'brazilmail.com': {
    'alias': 'mail.com'
  },
  'brew-master.com': {
    'alias': 'mail.com'
  },
  'california.usa.com': {
    'alias': 'mail.com'
  },
  'californiamail.com': {
    'alias': 'mail.com'
  },
  'caress.com': {
    'alias': 'mail.com'
  },
  'catlover.com': {
    'alias': 'mail.com'
  },
  'chef.net': {
    'alias': 'mail.com'
  },
  'chemist.com': {
    'alias': 'mail.com'
  },
  'chinamail.com': {
    'alias': 'mail.com'
  },
  'clerk.com': {
    'alias': 'mail.com'
  },
  'cliffhanger.com': {
    'alias': 'mail.com'
  },
  'collector.org': {
    'alias': 'mail.com'
  },
  'columnist.com': {
    'alias': 'mail.com'
  },
  'comic.com': {
    'alias': 'mail.com'
  },
  'computer4u.com': {
    'alias': 'mail.com'
  },
  'contractor.net': {
    'alias': 'mail.com'
  },
  'coolsite.net': {
    'alias': 'mail.com'
  },
  'counsellor.com': {
    'alias': 'mail.com'
  },
  'count.com': {
    'alias': 'mail.com'
  },
  'couple.com': {
    'alias': 'mail.com'
  },
  'cutey.com': {
    'alias': 'mail.com'
  },
  'cyberdude.com': {
    'alias': 'mail.com'
  },
  'cybergal.com': {
    'alias': 'mail.com'
  },
  'cyber-wizard.com': {
    'alias': 'mail.com'
  },
  'dallasmail.com': {
    'alias': 'mail.com'
  },
  'dbzmail.com': {
    'alias': 'mail.com'
  },
  'deliveryman.com': {
    'alias': 'mail.com'
  },
  'diplomats.com': {
    'alias': 'mail.com'
  },
  'disciples.com': {
    'alias': 'mail.com'
  },
  'doctor.com': {
    'alias': 'mail.com'
  },
  'doglover.com': {
    'alias': 'mail.com'
  },
  'doramail.com': {
    'alias': 'mail.com'
  },
  'dublin.com': {
    'alias': 'mail.com'
  },
  'earthling.net': {
    'alias': 'mail.com'
  },
  'elvisfan.com': {
    'alias': 'mail.com'
  },
  'englandmail.com': {
    'alias': 'mail.com'
  },
  'europemail.com': {
    'alias': 'mail.com'
  },
  'execs.com': {
    'alias': 'mail.com'
  },
  'fan.com': {
    'alias': 'mail.com'
  },
  'feelings.com': {
    'alias': 'mail.com'
  },
  'financier.com': {
    'alias': 'mail.com'
  },
  'fireman.net': {
    'alias': 'mail.com'
  },
  'florida.usa.com': {
    'alias': 'mail.com'
  },
  'footballer.com': {
    'alias': 'mail.com'
  },
  'gardener.com': {
    'alias': 'mail.com'
  },
  'geologist.com': {
    'alias': 'mail.com'
  },
  'germanymail.com': {
    'alias': 'mail.com'
  },
  'graduate.org': {
    'alias': 'mail.com'
  },
  'graphic-designer.com': {
    'alias': 'mail.com'
  },
  'hackermail.com': {
    'alias': 'mail.com'
  },
  'hairdresser.net': {
    'alias': 'mail.com'
  },
  'hilarious.com': {
    'alias': 'mail.com'
  },
  'hockeymail.com': {
    'alias': 'mail.com'
  },
  'homemail.com': {
    'alias': 'mail.com'
  },
  'hot-shot.com': {
    'alias': 'mail.com'
  },
  'hour.com': {
    'alias': 'mail.com'
  },
  'humanoid.net': {
    'alias': 'mail.com'
  },
  'illinois.usa.com': {
    'alias': 'mail.com'
  },
  'innocent.com': {
    'alias': 'mail.com'
  },
  'inorbit.com': {
    'alias': 'mail.com'
  },
  'instruction.com': {
    'alias': 'mail.com'
  },
  'instructor.net': {
    'alias': 'mail.com'
  },
  'insurer.com': {
    'alias': 'mail.com'
  },
  'irelandmail.com': {
    'alias': 'mail.com'
  },
  'italymail.com': {
    'alias': 'mail.com'
  },
  'japan.com': {
    'alias': 'mail.com'
  },
  'journalist.com': {
    'alias': 'mail.com'
  },
  'keromail.com': {
    'alias': 'mail.com'
  },
  'kittymail.com': {
    'alias': 'mail.com'
  },
  'koreamail.com': {
    'alias': 'mail.com'
  },
  'lawyer.com': {
    'alias': 'mail.com'
  },
  'legislator.com': {
    'alias': 'mail.com'
  },
  'loveable.com': {
    'alias': 'mail.com'
  },
  'lovecat.com': {
    'alias': 'mail.com'
  },
  'mad.scientist.com': {
    'alias': 'mail.com'
  },
  'madonnafan.com': {
    'alias': 'mail.com'
  },
  'madrid.com': {
    'alias': 'mail.com'
  },
  'marchmail.com': {
    'alias': 'mail.com'
  },
  'mexicomail.com': {
    'alias': 'mail.com'
  },
  'mindless.com': {
    'alias': 'mail.com'
  },
  'minister.com': {
    'alias': 'mail.com'
  },
  'mobsters.com': {
    'alias': 'mail.com'
  },
  'monarchy.com': {
    'alias': 'mail.com'
  },
  'moscowmail.com': {
    'alias': 'mail.com'
  },
  'munich.com': {
    'alias': 'mail.com'
  },
  'musician.org': {
    'alias': 'mail.com'
  },
  'muslim.com': {
    'alias': 'mail.com'
  },
  'newyork.usa.com': {
    'alias': 'mail.com'
  },
  'null.net': {
    'alias': 'mail.com'
  },
  'nycmail.com': {
    'alias': 'mail.com'
  },
  'oath.com': {
    'alias': 'mail.com'
  },
  'optician.com': {
    'alias': 'mail.com'
  },
  'pacificwest.com': {
    'alias': 'mail.com'
  },
  'petlover.com': {
    'alias': 'mail.com'
  },
  'photographer.net': {
    'alias': 'mail.com'
  },
  'playful.com': {
    'alias': 'mail.com'
  },
  'poetic.com': {
    'alias': 'mail.com'
  },
  'politician.com': {
    'alias': 'mail.com'
  },
  'popstar.com': {
    'alias': 'mail.com'
  },
  'presidency.com': {
    'alias': 'mail.com'
  },
  'priest.com': {
    'alias': 'mail.com'
  },
  'programmer.net': {
    'alias': 'mail.com'
  },
  'publicist.com': {
    'alias': 'mail.com'
  },
  'realtyagent.com': {
    'alias': 'mail.com'
  },
  'reborn.com': {
    'alias': 'mail.com'
  },
  'reggaefan.com': {
    'alias': 'mail.com'
  },
  'religious.com': {
    'alias': 'mail.com'
  },
  'repairman.com': {
    'alias': 'mail.com'
  },
  'representative.com': {
    'alias': 'mail.com'
  },
  'rescueteam.com': {
    'alias': 'mail.com'
  },
  'revenue.com': {
    'alias': 'mail.com'
  },
  'rocketship.com': {
    'alias': 'mail.com'
  },
  'rockfan.com': {
    'alias': 'mail.com'
  },
  'rome.com': {
    'alias': 'mail.com'
  },
  'royal.net': {
    'alias': 'mail.com'
  },
  'saintly.com': {
    'alias': 'mail.com'
  },
  'salesperson.net': {
    'alias': 'mail.com'
  },
  'sanfranmail.com': {
    'alias': 'mail.com'
  },
  'scientist.com': {
    'alias': 'mail.com'
  },
  'scotlandmail.com': {
    'alias': 'mail.com'
  },
  'secretary.net': {
    'alias': 'mail.com'
  },
  'seductive.com': {
    'alias': 'mail.com'
  },
  'singapore.com': {
    'alias': 'mail.com'
  },
  'snakebite.com': {
    'alias': 'mail.com'
  },
  'songwriter.net': {
    'alias': 'mail.com'
  },
  'soon.com': {
    'alias': 'mail.com'
  },
  'spainmail.com': {
    'alias': 'mail.com'
  },
  'teachers.org': {
    'alias': 'mail.com'
  },
  'technologist.com': {
    'alias': 'mail.com'
  },
  'texas.usa.com': {
    'alias': 'mail.com'
  },
  'thegame.com': {
    'alias': 'mail.com'
  },
  'therapist.net': {
    'alias': 'mail.com'
  },
  'toke.com': {
    'alias': 'mail.com'
  },
  'tokyo.com': {
    'alias': 'mail.com'
  },
  'toothfairy.com': {
    'alias': 'mail.com'
  },
  'tvstar.com': {
    'alias': 'mail.com'
  },
  'umpire.com': {
    'alias': 'mail.com'
  },
  'wallet.com': {
    'alias': 'mail.com'
  },
  'webname.com': {
    'alias': 'mail.com'
  },
  'weirdness.com': {
    'alias': 'mail.com'
  },
  'who.net': {
    'alias': 'mail.com'
  },
  'whoever.com': {
    'alias': 'mail.com'
  },
  'winning.com': {
    'alias': 'mail.com'
  },
  'witty.com': {
    'alias': 'mail.com'
  },
  'worker.com': {
    'alias': 'mail.com'
  },
  'workmail.com': {
    'alias': 'mail.com'
  },
  'yours.com': {
    'alias': 'mail.com'
  },
  'mail.telenor.dk': {
    'display_name': 'Telenor Danmark',
    'display_short_name': 'Telenor',
    'imap_host': 'mail.telenor.dk',
    'imap_port': '143',
    'imap_security': 'STARTTLS',
    'smtp_host': 'mail.telenor.dk',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'vip.cybercity.dk': {
    'alias': 'mail.telenor.dk'
  },
  'post.cybercity.dk': {
    'alias': 'mail.telenor.dk'
  },
  'email.dk': {
    'alias': 'mail.telenor.dk'
  },
  'mobil.dk': {
    'alias': 'mail.telenor.dk'
  },
  'privatmail.dk': {
    'alias': 'mail.telenor.dk'
  },
  'info.dk': {
    'alias': 'mail.telenor.dk'
  },
  'io.dk': {
    'alias': 'mail.telenor.dk'
  },
  'it.dk': {
    'alias': 'mail.telenor.dk'
  },
  'film.dk': {
    'alias': 'mail.telenor.dk'
  },
  'worldonline.dk': {
    'alias': 'mail.telenor.dk'
  },
  'wol.dk': {
    'alias': 'mail.telenor.dk'
  },
  '1031.inord.dk': {
    'alias': 'mail.telenor.dk'
  },
  '123mail.dk': {
    'alias': 'mail.telenor.dk'
  },
  '12fuel.dk': {
    'alias': 'mail.telenor.dk'
  },
  '12mail.dk': {
    'alias': 'mail.telenor.dk'
  },
  '12move.dk': {
    'alias': 'mail.telenor.dk'
  },
  '2senior.dk': {
    'alias': 'mail.telenor.dk'
  },
  'anarki.dk': {
    'alias': 'mail.telenor.dk'
  },
  'anderledes.dk': {
    'alias': 'mail.telenor.dk'
  },
  'begavet.dk': {
    'alias': 'mail.telenor.dk'
  },
  'bitnisse.dk': {
    'alias': 'mail.telenor.dk'
  },
  'city.dk': {
    'alias': 'mail.telenor.dk'
  },
  'cool.dk': {
    'alias': 'mail.telenor.dk'
  },
  'cyberdude.dk': {
    'alias': 'mail.telenor.dk'
  },
  'cyberjunkie.dk': {
    'alias': 'mail.telenor.dk'
  },
  'dk2net.dk': {
    'alias': 'mail.telenor.dk'
  },
  'dk-online.dk': {
    'alias': 'mail.telenor.dk'
  },
  'elinstallatoer.dk': {
    'alias': 'mail.telenor.dk'
  },
  'elsker.dk': {
    'alias': 'mail.telenor.dk'
  },
  'elvis.dk': {
    'alias': 'mail.telenor.dk'
  },
  'fald.dk': {
    'alias': 'mail.telenor.dk'
  },
  'fedt.dk': {
    'alias': 'mail.telenor.dk'
  },
  'feminin.dk': {
    'alias': 'mail.telenor.dk'
  },
  'forening.dk': {
    'alias': 'mail.telenor.dk'
  },
  'gadefejer.dk': {
    'alias': 'mail.telenor.dk'
  },
  'gason.dk': {
    'alias': 'mail.telenor.dk'
  },
  'grin.dk': {
    'alias': 'mail.telenor.dk'
  },
  'grov.dk': {
    'alias': 'mail.telenor.dk'
  },
  'hardworking.dk': {
    'alias': 'mail.telenor.dk'
  },
  'heaven.dk': {
    'alias': 'mail.telenor.dk'
  },
  'hemmelig.dk': {
    'alias': 'mail.telenor.dk'
  },
  'huleboer.dk': {
    'alias': 'mail.telenor.dk'
  },
  'image.dk': {
    'alias': 'mail.telenor.dk'
  },
  'inbound.dk': {
    'alias': 'mail.telenor.dk'
  },
  'indbakke.dk': {
    'alias': 'mail.telenor.dk'
  },
  'infile.dk': {
    'alias': 'mail.telenor.dk'
  },
  'jyde.dk': {
    'alias': 'mail.telenor.dk'
  },
  'klog.dk': {
    'alias': 'mail.telenor.dk'
  },
  'knus.dk': {
    'alias': 'mail.telenor.dk'
  },
  'krudt.dk': {
    'alias': 'mail.telenor.dk'
  },
  'kulturel.dk': {
    'alias': 'mail.telenor.dk'
  },
  'larsen.dk': {
    'alias': 'mail.telenor.dk'
  },
  'lazy.dk': {
    'alias': 'mail.telenor.dk'
  },
  'lystig.dk': {
    'alias': 'mail.telenor.dk'
  },
  'mail.dia.dk': {
    'alias': 'mail.telenor.dk'
  },
  'maskulin.dk': {
    'alias': 'mail.telenor.dk'
  },
  'min-postkasse.dk': {
    'alias': 'mail.telenor.dk'
  },
  'musling.dk': {
    'alias': 'mail.telenor.dk'
  },
  'natteliv.dk': {
    'alias': 'mail.telenor.dk'
  },
  'netbruger.dk': {
    'alias': 'mail.telenor.dk'
  },
  'pedal.dk': {
    'alias': 'mail.telenor.dk'
  },
  'pengemand.dk': {
    'alias': 'mail.telenor.dk'
  },
  'pokerface.dk': {
    'alias': 'mail.telenor.dk'
  },
  'post.dia.dk': {
    'alias': 'mail.telenor.dk'
  },
  'postman.dk': {
    'alias': 'mail.telenor.dk'
  },
  'privat.dia.dk': {
    'alias': 'mail.telenor.dk'
  },
  'quake.dk': {
    'alias': 'mail.telenor.dk'
  },
  'ready.dk': {
    'alias': 'mail.telenor.dk'
  },
  'secret.dk': {
    'alias': 'mail.telenor.dk'
  },
  'sleepy.dk': {
    'alias': 'mail.telenor.dk'
  },
  'sporty.dk': {
    'alias': 'mail.telenor.dk'
  },
  'superbruger.dk': {
    'alias': 'mail.telenor.dk'
  },
  'talent.dk': {
    'alias': 'mail.telenor.dk'
  },
  'tanke.dk': {
    'alias': 'mail.telenor.dk'
  },
  'taxidriver.dk': {
    'alias': 'mail.telenor.dk'
  },
  'teens.dk': {
    'alias': 'mail.telenor.dk'
  },
  'teknik.dk': {
    'alias': 'mail.telenor.dk'
  },
  'tjekket.dk': {
    'alias': 'mail.telenor.dk'
  },
  'traceroute.dk': {
    'alias': 'mail.telenor.dk'
  },
  'tv.dk': {
    'alias': 'mail.telenor.dk'
  },
  'ugenstilbud.dk': {
    'alias': 'mail.telenor.dk'
  },
  'ungdom.dk': {
    'alias': 'mail.telenor.dk'
  },
  'video.dk': {
    'alias': 'mail.telenor.dk'
  },
  'vittig.dk': {
    'alias': 'mail.telenor.dk'
  },
  '126.com': {
    'display_name': '126.com',
    'display_short_name': '126.com',
    'imap_host': 'imap.126.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.126.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  '163.com': {
    'display_name': '163.com',
    'display_short_name': '163.com',
    'imap_host': 'imap.163.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.163.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'a1.net': {
    'display_name': 'a1.net',
    'display_short_name': 'a1.net',
    'imap_host': 'securemail.a1.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'securemail.a1.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'aon.at': {
    'alias': 'a1.net'
  },
  'abc.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'abc.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'active24.com': {
    'display_name': 'ACTIVE 24 Webhosting',
    'display_short_name': 'ACTIVE 24',
    'imap_host': 'email.active24.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'email.active24.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'smtp.cz': {
    'alias': 'active24.com'
  },
  'agate.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'agate.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'aol.com': {
    'display_name': 'AOL Mail',
    'display_short_name': 'AOL',
    'imap_host': 'imap.aol.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.aol.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'aim.com': {
    'alias': 'aol.com'
  },
  'netscape.net': {
    'alias': 'aol.com'
  },
  'alice.it': {
    'display_name': 'Alice Italy',
    'display_short_name': 'Alice',
    'imap_host': 'in.alice.it',
    'imap_port': '143',
    'imap_security': 'none',
    'smtp_host': 'out.alice.it',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'amail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_security': 'none'
  },
  'amber.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'amber.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ameritech.net': {
    'alias': 'att.net'
  },
  'att.net': {
    'display_name': 'AT&T',
    'display_short_name': 'AT&T',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'outbound.att.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'bellsouth.net': {
    'alias': 'att.net'
  },
  'flash.net': {
    'alias': 'att.net'
  },
  'nvbell.net': {
    'alias': 'att.net'
  },
  'pacbell.net': {
    'alias': 'att.net'
  },
  'prodigy.net': {
    'alias': 'att.net'
  },
  'sbcglobal.net': {
    'alias': 'att.net'
  },
  'snet.net': {
    'alias': 'att.net'
  },
  'swbell.net': {
    'alias': 'att.net'
  },
  'wans.net': {
    'alias': 'att.net'
  },
  'garnet.broba.cc': {
    'alias': 'broba.cc'
  },
  'amethyst.broba.cc': {
    'alias': 'broba.cc'
  },
  'coral.broba.ccv': {
    'alias': 'broba.cc'
  },
  'diamond.broba.cc': {
    'alias': 'broba.cc'
  },
  'broba.cc': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.broba.cc',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'onet.pl': {
    'display_name': 'Poczta Onet',
    'display_short_name': 'Onet',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.poczta.onet.pl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'onet.eu': {
    'alias': 'onet.pl'
  },
  'poczta.onet.pl': {
    'alias': 'onet.pl'
  },
  'poczta.onet.eu': {
    'alias': 'onet.pl'
  },
  'op.pl': {
    'alias': 'onet.pl'
  },
  'vp.pl': {
    'alias': 'onet.pl'
  },
  'autograf.pl': {
    'alias': 'onet.pl'
  },
  'buziaczek.pl': {
    'alias': 'onet.pl'
  },
  'amorki.pl': {
    'alias': 'onet.pl'
  },
  'republika.pl': {
    'alias': 'onet.pl'
  },
  'apost.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'apost.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'aqua.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'aqua.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'arcor.de': {
    'display_name': 'Arcor',
    'display_short_name': 'Arcor',
    'imap_host': 'imap.arcor.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.arcor.de',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'pec.it': {
    'alias': 'arubapec.it'
  },
  'arubapec.it': {
    'display_name': 'Aruba PEC',
    'display_short_name': 'Aruba',
    'imap_host': 'imaps.pec.aruba.it',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtps.pec.aruba.it',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'mypec.eu': {
    'alias': 'arubapec.it'
  },
  'gigapec.it': {
    'alias': 'arubapec.it'
  },
  'ingpec.eu': {
    'alias': 'arubapec.it'
  },
  'ballade.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ballade.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'bay.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'bay.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'bay.wind.jp': {
    'alias': 'bay.wind.ne.jp'
  },
  'bay.wind.co.jp': {
    'alias': 'bay.wind.ne.jp'
  },
  'bay.gunmanet.or.jp': {
    'alias': 'bay.wind.ne.jp'
  },
  'bay.gunmanet.ne.jp': {
    'alias': 'bay.wind.ne.jp'
  },
  'bb-niigata.jp': {
    'display_name': 'ＢＢにいがた',
    'display_short_name': 'BB-NIIGATA',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'pop.bb-niigata.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'dd.iij4u.or.jp': {
    'display_name': 'IIJ4U',
    'display_short_name': 'IIJ4U',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mbox.iij4u.or.jp',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'ff.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'hh.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'kk.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'nn.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'pp.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'rr.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'ss.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'bc.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'bk.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'bp.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'bu.iij4u.or.jp': {
    'alias': 'dd.iij4u.or.jp'
  },
  'beige.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'beige.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'skynet.be': {
    'display_name': 'Proximus',
    'display_short_name': 'Proximus',
    'imap_host': 'imap.proximus.be',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'relay.proximus.be',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'proximus.be': {
    'alias': 'skynet.be'
  },
  'belgacom.net': {
    'alias': 'skynet.be'
  },
  'kidcity.be': {
    'alias': 'skynet.be'
  },
  'bell.net': {
    'display_name': 'Bell Canada email',
    'display_short_name': 'BC Mail',
    'imap_host': 'imap.bell.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtphm.sympatico.ca',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'sympatico.ca': {
    'alias': 'bell.net'
  },
  'biglobe.ne.jp': {
    'display_name': 'Biglobe',
    'display_short_name': 'Biglobe',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.biglobe.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'bigpond.com': {
    'display_name': 'Telstra Mail',
    'display_short_name': 'TMail',
    'imap_host': 'imap.telstra.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.telstra.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'bigpond.net.au': {
    'alias': 'bigpond.com'
  },
  'telstra.com': {
    'alias': 'bigpond.com'
  },
  'bigpond.net': {
    'alias': 'bigpond.com'
  },
  'mail.ru': {
    'display_name': 'mail.ru',
    'display_short_name': 'mail.ru',
    'imap_host': 'imap.mail.ru',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'OAuth2',
      'password-cleartext'
    ],
    'smtp_host': 'smtp.mail.ru',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'inbox.ru': {
    'alias': 'mail.ru'
  },
  'list.ru': {
    'alias': 'mail.ru'
  },
  'bk.ru': {
    'alias': 'mail.ru'
  },
  'corp.mail.ru': {
    'alias': 'mail.ru'
  },
  'libero.it': {
    'display_name': 'Libero Mail',
    'display_short_name': 'Libero',
    'imap_host': 'imapmail.libero.it',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.libero.it',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'iol.it': {
    'alias': 'libero.it'
  },
  'blu.it': {
    'alias': 'libero.it'
  },
  'inwind.it': {
    'alias': 'libero.it'
  },
  'giallo.it': {
    'alias': 'libero.it'
  },
  'blue.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'blue.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'bluemail.ch': {
    'display_name': 'bluewin.ch',
    'display_short_name': 'bluewin.ch',
    'imap_host': 'imaps.bluewin.ch',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtpauths.bluewin.ch',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'bluewin.ch': {
    'display_name': 'bluewin.ch',
    'display_short_name': 'bluewin.ch',
    'imap_host': 'imaps.bluewin.ch',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtpauths.bluewin.ch',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'blueyonder.co.uk': {
    'display_name': 'Blueyonder: Virgin Media Mail',
    'display_short_name': 'Blueyonder',
    'imap_host': 'imap4.blueyonder.co.uk',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.blueyonder.co.uk',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'bmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'bmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'bol.com.br': {
    'display_name': 'BOL - Brasil Online',
    'display_short_name': 'BOL',
    'imap_host': 'imap.bol.com.br',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtps.bol.com.br',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'bolero.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'bolero.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'bpost.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'bpost.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'brown.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'brown.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'btinternet.com': {
    'display_name': 'BT Mail',
    'display_short_name': 'BT Mail',
    'imap_host': 'mail.btinternet.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.btinternet.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'btopenworld.com': {
    'alias': 'btinternet.com'
  },
  'talk21.com': {
    'alias': 'btinternet.com'
  },
  'camel.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'camel.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'cameo.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'cameo.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'hahah.nl': {
    'alias': 'ziggo.nl'
  },
  'ziggomail.com': {
    'alias': 'ziggo.nl'
  },
  'casema.nl': {
    'alias': 'ziggo.nl'
  },
  'zinders.nl': {
    'alias': 'ziggo.nl'
  },
  'ziggo.nl': {
    'display_name': 'Ziggo Mail',
    'display_short_name': 'Ziggo',
    'imap_host': 'imap.ziggo.nl',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ziggo.nl',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'zeggis.nl': {
    'alias': 'ziggo.nl'
  },
  'zeggis.com': {
    'alias': 'ziggo.nl'
  },
  'razcall.nl': {
    'alias': 'ziggo.nl'
  },
  'razcall.com': {
    'alias': 'ziggo.nl'
  },
  'upcmail.nl': {
    'alias': 'ziggo.nl'
  },
  'chello.nl': {
    'alias': 'ziggo.nl'
  },
  'multiweb.nl': {
    'alias': 'ziggo.nl'
  },
  'home.nl': {
    'alias': 'ziggo.nl'
  },
  'quicknet.nl': {
    'alias': 'ziggo.nl'
  },
  'cc9.ne.jp': {
    'display_name': 'CC9インターネットサービス',
    'display_short_name': 'CC9',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.cc9.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'cek.ne.jp': {
    'display_name': 'エコーシティー・駒ケ岳',
    'display_short_name': 'CEK-Net',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.cek.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'centurylink.net': {
    'display_name': 'CenturyLink.net',
    'display_short_name': 'CenturyLink',
    'imap_host': 'mail.centurylink.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.centurylink.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'embarqmail.com': {
    'alias': 'centurylink.net'
  },
  'centurytel.net': {
    'display_name': 'CenturyTel.net',
    'display_short_name': 'CenturyTel',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtpauth.centurytel.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'clds.net': {
    'alias': 'centurytel.net'
  },
  'coastalnow.net': {
    'alias': 'centurytel.net'
  },
  'cochill.net': {
    'alias': 'centurytel.net'
  },
  'cswnet.com': {
    'alias': 'centurytel.net'
  },
  'emadisonriver.com': {
    'alias': 'centurytel.net'
  },
  'emadisonriver.net': {
    'alias': 'centurytel.net'
  },
  'gallatinriver.net': {
    'alias': 'centurytel.net'
  },
  'grics.net': {
    'alias': 'centurytel.net'
  },
  'gulftel.com': {
    'alias': 'centurytel.net'
  },
  'madisonriver.biz': {
    'alias': 'centurytel.net'
  },
  'mebtel.net': {
    'alias': 'centurytel.net'
  },
  'cgl.ucsf.edu': {
    'display_name': 'UCSF CGL email',
    'display_short_name': 'CGL email',
    'imap_host': 'plato.cgl.ucsf.edu',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'plato.cgl.ucsf.edu',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'charter.net': {
    'alias': 'charter.com'
  },
  'charter.com': {
    'display_name': 'Charter Commuications',
    'display_short_name': 'Charter',
    'imap_host': 'mobile.charter.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mobile.charter.net',
    'smtp_port': '587',
    'smtp_security': 'SSL / TLS'
  },
  'clio.ne.jp': {
    'display_name': 'CLIO-Net移管サービス',
    'display_short_name': 'CLIO-Net',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.clio.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'sfr.fr': {
    'display_name': 'SFR / Neuf',
    'display_short_name': 'SFR',
    'imap_host': 'imap.sfr.fr',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.sfr.fr',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'neuf.fr': {
    'alias': 'sfr.fr'
  },
  'club-internet.fr': {
    'alias': 'sfr.fr'
  },
  'clustermail.de': {
    'display_name': 'Clustermail',
    'display_short_name': 'Clustermail',
    'imap_host': 'mail.clustermail.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.clustermail.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'cmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'cmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'versatel.de': {
    'display_name': 'Versatel',
    'display_short_name': 'Versatel',
    'imap_host': 'mx.versatel.de',
    'imap_port': '143',
    'imap_security': 'none',
    'smtp_host': 'smtp.versatel.de',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'versanet.de': {
    'alias': 'versatel.de'
  },
  'foni.net': {
    'alias': 'versatel.de'
  },
  'gelsennet.de': {
    'alias': 'versatel.de'
  },
  'telebel.de': {
    'alias': 'versatel.de'
  },
  'telelev.de': {
    'alias': 'versatel.de'
  },
  'cneweb.de': {
    'alias': 'versatel.de'
  },
  'ruhrnet-online.de': {
    'alias': 'versatel.de'
  },
  'co1.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'co1.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'co1.wind.jp': {
    'alias': 'co1.wind.ne.jp'
  },
  'co2.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'co2.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'co2.wind.jp': {
    'alias': 'co2.wind.ne.jp'
  },
  'co3.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'co3.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'co3.wind.jp': {
    'alias': 'co3.wind.ne.jp'
  },
  'cocoa.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'cocoa.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'coda.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'coda.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'comcast.net': {
    'display_name': 'Comcast',
    'display_short_name': 'Comcast',
    'imap_host': 'imap.comcast.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.comcast.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'concerto.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'concerto.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'coral.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'coral.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'courante.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'courante.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'cox.net': {
    'display_name': 'Cox',
    'display_short_name': 'Cox',
    'imap_host': 'imap.cox.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.cox.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'cpost.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'cpost.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'cream.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'cream.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'cty-net.ne.jp': {
    'display_name': 'CTY Mail',
    'display_short_name': 'CTYMail',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtps.cty-net.ne.jp',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'm2.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm3.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm4.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm5.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm6.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm7.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm8.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'm9.cty-net.ne.jp': {
    'alias': 'cty-net.ne.jp'
  },
  'cty-net.com': {
    'alias': 'cty-net.ne.jp'
  },
  'dan.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'dan.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'dan.wind.jp': {
    'alias': 'dan.wind.ne.jp'
  },
  'dan.wind.co.jp': {
    'alias': 'dan.wind.ne.jp'
  },
  'dan.gunmanet.or.jp': {
    'alias': 'dan.wind.ne.jp'
  },
  'dan.gunmanet.ne.jp': {
    'alias': 'dan.wind.ne.jp'
  },
  'dance.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'dance.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'dmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'dmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'dondominio.com': {
    'display_name': 'DonDominio/MrDomain',
    'display_short_name': 'DonDominio/MrDomain',
    'imap_host': 'imap.dondominio.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.dondominio.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'iijmio-mail.jp': {
    'display_name': 'IIJmio セーフティメール',
    'display_short_name': 'IIJmio',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mbox.iijmio-mail.jp',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'miomio.jp': {
    'alias': 'iijmio-mail.jp'
  },
  'miobox.jp': {
    'alias': 'iijmio-mail.jp'
  },
  'e23.jp': {
    'alias': 'iijmio-mail.jp'
  },
  'x-il.jp': {
    'alias': 'iijmio-mail.jp'
  },
  'earthlink.net': {
    'display_name': 'EarthLink',
    'display_short_name': 'EarthLink',
    'imap_host': 'imap.earthlink.net',
    'imap_port': '143',
    'imap_security': 'none',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtpauth.earthlink.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'mindspring.com': {
    'alias': 'earthlink.net'
  },
  'ix.netcom.com': {
    'alias': 'earthlink.net'
  },
  'ebony.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ebony.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'elpasotel.net': {
    'display_name': 'Elpasotel.net',
    'display_short_name': 'Elpasotel',
    'imap_host': 'mail.elpasotel.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.elpasotel.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'seznam.cz': {
    'display_name': 'Seznam',
    'display_short_name': 'Seznam',
    'imap_host': 'imap.seznam.cz',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.seznam.cz',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'email.cz': {
    'alias': 'seznam.cz'
  },
  'post.cz': {
    'alias': 'seznam.cz'
  },
  'spoluzaci.cz': {
    'alias': 'seznam.cz'
  },
  'email.it': {
    'display_name': 'email.it',
    'display_short_name': 'email.it',
    'imap_host': 'imapmail.email.it',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtp.email.it',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'email.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'email.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'emailsrvr.com': {
    'display_name': 'Rackspace Email Hosting',
    'display_short_name': 'rackspace',
    'imap_host': 'secure.emailsrvr.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'secure.emailsrvr.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ewe.net': {
    'display_name': 'EWE Mail',
    'display_short_name': 'EWE',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ewe.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'ewetel.de': {
    'alias': 'ewe.net'
  },
  'teleos-web.de': {
    'alias': 'ewe.net'
  },
  'fantasy.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'fantasy.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'fastwebnet.it': {
    'display_name': 'fastwebnet.it',
    'display_short_name': 'fastwebnet.it',
    'imap_host': 'imap.fastwebnet.it',
    'imap_port': '143',
    'imap_security': 'STARTTLS',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtp.fastwebnet.it',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'flamenco.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'flamenco.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'fmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'fmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'free.fr': {
    'display_name': 'Free Telecom',
    'display_short_name': 'free.fr',
    'imap_host': 'imap.free.fr',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.free.fr',
    'smtp_port': '25',
    'smtp_security': 'none',
    'smtp_restriction': [
      'client-IP-address'
    ]
  },
  'freenet.de': {
    'display_name': 'Freenet Mail',
    'display_short_name': 'Freenet',
    'imap_host': 'mx.freenet.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'mx.freenet.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'fuga.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'fuga.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'gandi.net': {
    'display_name': 'Gandi Mail',
    'display_short_name': 'Gandi',
    'imap_host': 'mail.gandi.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.gandi.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'gigahost.dk': {
    'display_name': 'Gigahost Mail',
    'display_short_name': 'Gigahost',
    'imap_host': 'mail.gigahost.dk',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.gigahost.dk',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'gmail.com': {
    'alias': 'googlemail.com'
  },
  'googlemail.com': {
    'display_name': 'Google Mail',
    'display_short_name': 'GMail',
    'imap_host': 'imap.gmail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'OAuth2',
      'password-cleartext'
    ],
    'smtp_host': 'smtp.gmail.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS',
    'smtp_authentication': [
      'OAuth2',
      'password-cleartext'
    ],
    'enable_steps': [
      {
        'url': 'https://mail.google.com/mail/?ui=2&shva=1#settings/fwdandpop',
        'label': 'You need to enable IMAP access'
      }
    ]
  },
  'google.com': {
    'alias': 'googlemail.com'
  },
  'jazztel.es': {
    'alias': 'googlemail.com'
  },
  'gmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'gmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'gmx.net': {
    'display_name': 'GMX Freemail',
    'display_short_name': 'GMX',
    'imap_host': 'imap.gmx.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.gmx.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'gmx.de': {
    'alias': 'gmx.net'
  },
  'gmx.at': {
    'alias': 'gmx.net'
  },
  'gmx.ch': {
    'alias': 'gmx.net'
  },
  'gmx.eu': {
    'alias': 'gmx.net'
  },
  'gmx.biz': {
    'alias': 'gmx.net'
  },
  'gmx.org': {
    'alias': 'gmx.net'
  },
  'gmx.info': {
    'alias': 'gmx.net'
  },
  'gmx.com': {
    'display_name': 'GMX Freemail',
    'display_short_name': 'GMX',
    'imap_host': 'imap.gmx.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.gmx.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'gmx.tm': {
    'alias': 'gmx.com'
  },
  'gmx.us': {
    'alias': 'gmx.com'
  },
  'gmx.co.uk': {
    'alias': 'gmx.com'
  },
  'gmx.es': {
    'alias': 'gmx.com'
  },
  'gmx.fr': {
    'alias': 'gmx.com'
  },
  'gmx.ca': {
    'alias': 'gmx.com'
  },
  'gmx.cn': {
    'alias': 'gmx.com'
  },
  'gmx.co.in': {
    'alias': 'gmx.com'
  },
  'gmx.com.br': {
    'alias': 'gmx.com'
  },
  'gmx.com.my': {
    'alias': 'gmx.com'
  },
  'gmx.hk': {
    'alias': 'gmx.com'
  },
  'gmx.ie': {
    'alias': 'gmx.com'
  },
  'gmx.ph': {
    'alias': 'gmx.com'
  },
  'gmx.pt': {
    'alias': 'gmx.com'
  },
  'gmx.ru': {
    'alias': 'gmx.com'
  },
  'gmx.se': {
    'alias': 'gmx.com'
  },
  'gmx.sg': {
    'alias': 'gmx.com'
  },
  'gmx.tw': {
    'alias': 'gmx.com'
  },
  'gmx.com.tr': {
    'alias': 'gmx.com'
  },
  'gmx.it': {
    'alias': 'gmx.com'
  },
  'gmx.li': {
    'alias': 'gmx.com'
  },
  'go.tvm.ne.jp': {
    'display_name': 'テレビ松本ケーブルインターネットサービス',
    'display_short_name': 'TVM-Net',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'go.tvm.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'o2.pl': {
    'display_name': 'o2 Poczta',
    'display_short_name': 'o2',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'poczta.o2.pl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS',
    'smtp_restriction': [
      'client-IP-address'
    ]
  },
  'go2.pl': {
    'alias': 'o2.pl'
  },
  'tlen.pl': {
    'alias': 'o2.pl'
  },
  'prokonto.pl': {
    'alias': 'o2.pl'
  },
  'online.de': {
    'alias': '1und1.de'
  },
  'onlinehome.de': {
    'alias': '1und1.de'
  },
  'sofortstart.de': {
    'alias': '1und1.de'
  },
  'sofort-start.de': {
    'alias': '1und1.de'
  },
  'sofortsurf.de': {
    'alias': '1und1.de'
  },
  'sofort-surf.de': {
    'alias': '1und1.de'
  },
  'go4more.de': {
    'alias': '1und1.de'
  },
  'kundenserver.de': {
    'alias': '1und1.de'
  },
  'schlund.de': {
    'alias': '1und1.de'
  },
  '1und1.de': {
    'display_name': '1&1',
    'display_short_name': '1&1',
    'imap_host': 'imap.1und1.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.1und1.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'goneo.de': {
    'display_name': 'goneo',
    'display_short_name': 'goneo',
    'imap_host': 'imap.goneo.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.goneo.de',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'goo.jp': {
    'display_name': 'goo メールアドバンス',
    'display_short_name': 'goo',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.goo.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'gransy.com': {
    'display_name': 'G-Hosting.cz a Station.cz',
    'display_short_name': 'G-Hosting.cz a Station.cz',
    'imap_host': 'imap.gransy.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.gransy.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'internetserver.cz': {
    'alias': 'gransy.com'
  },
  'grape.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'grape.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'gray.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'gray.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'hal.ne.jp': {
    'display_name': 'ハルインターネット',
    'display_short_name': 'HAL',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.hal.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'hana.or.jp': {
    'display_name': 'きたうら花ねっと',
    'display_short_name': '花ねっと',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.hana.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'hotmail.com': {
    'alias': 'outlook.com'
  },
  'hotmail.co.uk': {
    'alias': 'outlook.com'
  },
  'hotmail.co.jp': {
    'alias': 'outlook.com'
  },
  'hotmail.com.br': {
    'alias': 'outlook.com'
  },
  'hotmail.de': {
    'alias': 'outlook.com'
  },
  'hotmail.fr': {
    'alias': 'outlook.com'
  },
  'hotmail.it': {
    'alias': 'outlook.com'
  },
  'hotmail.es': {
    'alias': 'outlook.com'
  },
  'live.com': {
    'alias': 'outlook.com'
  },
  'live.co.uk': {
    'alias': 'outlook.com'
  },
  'live.co.jp': {
    'alias': 'outlook.com'
  },
  'live.de': {
    'alias': 'outlook.com'
  },
  'live.fr': {
    'alias': 'outlook.com'
  },
  'live.it': {
    'alias': 'outlook.com'
  },
  'live.jp': {
    'alias': 'outlook.com'
  },
  'msn.com': {
    'alias': 'outlook.com'
  },
  'outlook.com': {
    'display_name': 'Outlook.com (Microsoft)',
    'display_short_name': 'Outlook',
    'imap_host': 'imap-mail.outlook.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp-mail.outlook.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'i.softbank.jp': {
    'display_name': 'SoftBank',
    'display_short_name': 'SoftBank',
    'imap_host': 'imap.softbank.jp',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.softbank.jp',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ic-net.or.jp': {
    'display_name': 'IC-NET',
    'display_short_name': 'IC-NET',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ic-net.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'iiyama-catv.ne.jp': {
    'display_name': 'ケーブルテレビiネット飯山',
    'display_short_name': 'iネット飯山',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.iiyama-catv.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'imail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'imail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'inbox.lt': {
    'display_name': 'Inbox.lt',
    'display_short_name': 'Inbox.lt',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.inbox.lt',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'inbox.lv': {
    'display_name': 'Inbox.lv',
    'display_short_name': 'Inbox.lv',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.inbox.lv',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'indigo.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'indigo.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'inet-shibata.or.jp': {
    'display_name': 'インターネット新発田',
    'display_short_name': 'INET-SHIBATA',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'po.inet-shibata.or.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'internode.on.net': {
    'display_name': 'Internode',
    'display_short_name': 'Internode',
    'imap_host': 'mail.internode.on.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.internode.on.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ipax.at': {
    'display_name': 'IPAX Internet Services',
    'display_short_name': 'IPAX',
    'imap_host': 'mail.ipax.at',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.ipax.at',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ispgateway.de': {
    'alias': 'df.eu'
  },
  'df.eu': {
    'display_name': 'domainFACTORY',
    'display_short_name': 'domainFACTORY',
    'imap_host': 'sslmailpool.ispgateway.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtprelaypool.ispgateway.de',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ivory.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ivory.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'iwafune.ne.jp': {
    'display_name': 'インターネットいわふね',
    'display_short_name': 'IWAFUNE',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'po.iwafune.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'jade.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'jade.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'janis.or.jp': {
    'display_name': 'Janis',
    'display_short_name': 'Janis',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.%EMAILDOMAIN%',
    'smtp_port': '25',
    'smtp_security': 'none',
    'smtp_restriction': [
      'client-IP-address'
    ]
  },
  'jet.ne.jp': {
    'display_name': 'JETINTERNET',
    'display_short_name': 'JET',
    'imap_host': 'imap.jet.ne.jp',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtp.jet.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ji.jet.ne.jp': {
    'display_name': 'JETINTERNET',
    'display_short_name': 'JET',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp02.jet.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'jmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'jmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'kl.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'kl.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'kl.wind.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'kl.wind.co.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'kl.gunmanet.or.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'kl.gunmanet.ne.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'k1.wind.ne.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'k1.wind.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'k1.gunmanet.or.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'k1.gunmanet.ne.jp': {
    'alias': 'kl.wind.ne.jp'
  },
  'kabelmail.de': {
    'display_name': 'Kabel Deutschland',
    'display_short_name': 'Kabel D',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.kabelmail.de',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'kelcom.net': {
    'display_name': 'KELCOM Internet',
    'display_short_name': 'KELCOM',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.kelcom.net',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'khaki.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'khaki.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'kmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'kmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'kokuyou.ne.jp': {
    'display_name': '長和町黒耀の里ゆいねっと',
    'display_short_name': 'ゆいねっと',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.kokuyou.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'lapis.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'lapis.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'laposte.net': {
    'display_name': 'LaPoste',
    'display_short_name': 'LaPoste',
    'imap_host': 'imap.laposte.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.laposte.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'lemon.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'lemon.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'lilac.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'lilac.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'lime.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'lime.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'mx1.tiki.ne.jp': {
    'display_name': 'TikiTikiインターネット',
    'display_short_name': 'TikiTiki',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp-auth.tiki.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'mx2.et.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx2.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx2.wt.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx3.et.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx3.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx4.et.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx4.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx5.et.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx5.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx6.et.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx6.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx7.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx8.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx9.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx21.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx22.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx31.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx32.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx35.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx36.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx41.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx51.et.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx51.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx52.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx61.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx71.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx81.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx82.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mx91.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'ma100.tiki.ne.jp': {
    'alias': 'mx1.tiki.ne.jp'
  },
  'mac.com': {
    'alias': 'me.com'
  },
  'me.com': {
    'display_name': 'Apple iCloud',
    'display_short_name': 'Apple',
    'imap_host': 'imap.mail.me.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'plain'
    ],
    'smtp_host': 'smtp.mail.me.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'icloud.com': {
    'alias': 'me.com'
  },
  'mahoroba.ne.jp': {
    'display_name': 'インターネットまほろば',
    'display_short_name': 'まほろば',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.mahoroba.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'mail.dk': {
    'display_name': 'TDC (DK)',
    'display_short_name': 'TDC',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'asmtp.mail.dk',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'mail.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'mail.wind.jp': {
    'alias': 'mail.wind.ne.jp'
  },
  'mail.wind.co.jp': {
    'alias': 'mail.wind.ne.jp'
  },
  'mail.gunmanet.or.jp': {
    'alias': 'mail.wind.ne.jp'
  },
  'mail.gunmanet.ne.jp': {
    'alias': 'mail.wind.ne.jp'
  },
  'mail.gunmanet.jp': {
    'alias': 'mail.wind.ne.jp'
  },
  'mail.iwafune.ne.jp': {
    'display_name': 'インターネットいわふね',
    'display_short_name': 'IWAFUNE',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.iwafune.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'maroon.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'maroon.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'messagingengine.com': {
    'alias': 'MessagingEngine'
  },
  'MessagingEngine': {
    'display_name': 'FastMail',
    'display_short_name': 'FastMail',
    'imap_host': 'imap.fastmail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.fastmail.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'minuet.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'minuet.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ml.murakami.ne.jp': {
    'display_name': 'インターネットいわふね',
    'display_short_name': 'IWAFUNE',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ml.murakami.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'pop.shibata.ne.jp': {
    'display_name': 'インターネット新発田',
    'display_short_name': 'INET-SHIBATA',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': '%EMAILDOMAIN%',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'ml.shibata.ne.jp': {
    'alias': 'pop.shibata.ne.jp'
  },
  'mnet.ne.jp': {
    'display_name': 'Mnet メール サービス',
    'display_short_name': 'Mnetメール',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.mnet.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'mopera.net': {
    'display_name': 'mopera U',
    'display_short_name': 'mopera U',
    'imap_host': 'mail.mopera.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.mopera.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'yandex.ru': {
    'display_name': 'Yandex Mail',
    'display_short_name': 'Yandex',
    'imap_host': 'imap.yandex.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.yandex.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS',
    'enable_steps': [
      {
        'url': 'http://mail.yandex.ru/neo/setup_client',
        'label': 'Check \'Enable IMAP\' on Yandex.Mail setup page'
      }
    ]
  },
  'yandex.com': {
    'alias': 'yandex.ru'
  },
  'yandex.net': {
    'alias': 'yandex.ru'
  },
  'yandex.by': {
    'alias': 'yandex.ru'
  },
  'yandex.kz': {
    'alias': 'yandex.ru'
  },
  'yandex.ua': {
    'alias': 'yandex.ru'
  },
  'ya.ru': {
    'alias': 'yandex.ru'
  },
  'narod.ru': {
    'alias': 'yandex.ru'
  },
  'navy.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'navy.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'nifty.com': {
    'display_name': '@nifty',
    'display_short_name': '@nifty',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.nifty.com',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'nsat.jp': {
    'display_name': 'ＢＢにいがた',
    'display_short_name': 'NSAT',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.nsat.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ntlworld.com': {
    'display_name': 'NTL World: Virgin Media Mail',
    'display_short_name': 'NTL World',
    'imap_host': 'imap.ntlworld.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ntlworld.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ocn.ne.jp': {
    'display_name': 'OCN',
    'display_short_name': 'OCN',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ocn.ne.jp',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ocn.ad.jp': {
    'alias': 'ocn.ne.jp'
  },
  'olive.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'olive.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'one.com': {
    'display_name': 'one.com',
    'display_short_name': 'one.com',
    'imap_host': 'imap.one.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'send.one.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'one.cz': {
    'display_name': 'Webhosting Registrator.cz Mail',
    'display_short_name': 'Registrator.cz',
    'imap_host': 'imap.registrator.cz',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.registrator.cz',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'opal.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'opal.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'orange.fr': {
    'display_name': 'Orange',
    'display_short_name': 'Orange',
    'imap_host': 'imap.orange.fr',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.orange.fr',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'wanadoo.fr': {
    'alias': 'orange.fr'
  },
  'orange.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'orange.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'orchid.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'orchid.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ovh.net': {
    'display_name': 'OVH',
    'display_short_name': 'OVH',
    'imap_host': 'ssl0.ovh.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ssl0.ovh.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'pal.kijimadaira.jp': {
    'display_name': '木島平村FTTH',
    'display_short_name': '木島平村FTTH',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.pal.kijimadaira.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'palette.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'palette.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'parabox.or.jp': {
    'display_name': 'パラボックス',
    'display_short_name': 'PARABOX',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.parabox.or.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'peach.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'peach.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'peoplepc.com': {
    'display_name': 'PeoplePC',
    'display_short_name': 'PeoplePC',
    'imap_host': 'imap.peoplepc.com',
    'imap_port': '143',
    'imap_security': 'none',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtpauth.peoplepc.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'plum.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'plum.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'po.dcn.ne.jp': {
    'display_name': 'DCNインターネットサービス',
    'display_short_name': 'DCN',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'po.dcn.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'po.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'po.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'po.wind.jp': {
    'alias': 'po.wind.ne.jp'
  },
  'po.wind.co.jp': {
    'alias': 'po.wind.ne.jp'
  },
  'po.gunmanet.or.jp': {
    'alias': 'po.wind.ne.jp'
  },
  'po.gunmanet.ne.jp': {
    'alias': 'po.wind.ne.jp'
  },
  'pobox.com': {
    'display_name': 'Pobox',
    'display_short_name': 'Pobox',
    'imap_host': 'mail.pobox.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.pobox.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'polka.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'polka.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'posteo.de': {
    'display_name': 'Posteo',
    'display_short_name': 'Posteo',
    'imap_host': 'posteo.de',
    'imap_port': '143',
    'imap_security': 'STARTTLS',
    'smtp_host': 'posteo.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'posteo.at': {
    'alias': 'posteo.de'
  },
  'posteo.ch': {
    'alias': 'posteo.de'
  },
  'posteo.org': {
    'alias': 'posteo.de'
  },
  'posteo.eu': {
    'alias': 'posteo.de'
  },
  'ptd.net': {
    'display_name': 'PenTeleData',
    'display_short_name': 'PenTeleData',
    'imap_host': 'promail.ptd.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'promail.ptd.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'purple.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'purple.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'q.com': {
    'display_name': 'Q.com',
    'display_short_name': 'Q.com',
    'imap_host': 'mail.q.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.q.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'qq.com': {
    'display_name': 'qq.com',
    'display_short_name': 'qq.com',
    'imap_host': 'imap.qq.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.qq.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'rainbow.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'rainbow.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'rambler.ru': {
    'display_name': 'Rambler Mail',
    'display_short_name': 'Rambler',
    'imap_host': 'mail.rambler.ru',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.rambler.ru',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'red.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'red.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'rmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'rmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'yahoo.com': {
    'display_name': 'Yahoo! Mail',
    'display_short_name': 'Yahoo',
    'imap_host': 'imap.mail.yahoo.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.yahoo.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'yahoo.de': {
    'alias': 'yahoo.com'
  },
  'yahoo.it': {
    'alias': 'yahoo.com'
  },
  'yahoo.fr': {
    'alias': 'yahoo.com'
  },
  'yahoo.es': {
    'alias': 'yahoo.com'
  },
  'yahoo.se': {
    'alias': 'yahoo.com'
  },
  'yahoo.co.uk': {
    'alias': 'yahoo.com'
  },
  'yahoo.co.nz': {
    'alias': 'yahoo.com'
  },
  'yahoo.com.au': {
    'alias': 'yahoo.com'
  },
  'yahoo.com.ar': {
    'alias': 'yahoo.com'
  },
  'yahoo.com.br': {
    'alias': 'yahoo.com'
  },
  'yahoo.com.mx': {
    'alias': 'yahoo.com'
  },
  'ymail.com': {
    'alias': 'yahoo.com'
  },
  'rocketmail.com': {
    'alias': 'yahoo.com'
  },
  'yahoodns.net': {
    'alias': 'yahoo.com'
  },
  'rondo.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'rondo.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'rose.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'rose.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'rouge.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'rouge.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'rr.com': {
    'display_name': 'RoadRunner/TWC',
    'display_short_name': 'RR/TWC',
    'imap_host': 'mail.twc.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.twc.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'ruby.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ruby.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'runestone.net': {
    'display_name': 'Runestone Telecom Association',
    'display_short_name': 'Runestone',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.runestone.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'strato.de': {
    'display_name': 'Strato',
    'display_short_name': 'Strato',
    'imap_host': 'imap.strato.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtp.strato.de',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'rzone.de': {
    'alias': 'strato.de'
  },
  'sakunet.ne.jp': {
    'display_name': '佐久ケーブルテレビ',
    'display_short_name': 'Saku-Net',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.sakunet.ne.jp',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'sea.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'sea.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'secureserver.net': {
    'alias': 'wildwestdomains.com'
  },
  'wildwestdomains.com': {
    'display_name': 'Your WildWest domain',
    'display_short_name': 'WildWest',
    'imap_host': 'imap.secureserver.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtpout.secureserver.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'sepia.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'sepia.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'serenade.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'serenade.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'silk.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'silk.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'silver.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'silver.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'sky.com': {
    'display_name': 'Sky Mail',
    'display_short_name': 'Sky',
    'imap_host': 'imap.tools.sky.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.tools.sky.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'sky.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'sky.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'smail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'snow.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'snow.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'so.wind.ne.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': 'so.wind.ne.jp',
    'imap_port': '143',
    'imap_security': 'none',
    'imap_authentication': [
      'plain'
    ],
    'smtp_host': 'so.wind.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'so.wind.jp': {
    'alias': 'so.wind.ne.jp'
  },
  'sonata.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'sonata.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'studenti.univr.it': {
    'display_name': 'Università degli Studi di Verona',
    'display_short_name': 'UniVR',
    'imap_host': 'univr.mail.cineca.it',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'univr.smtpauth.cineca.it',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'suite.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'suite.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'symphony.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'symphony.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  't-online.de': {
    'display_name': 'T-Online',
    'display_short_name': 'T-Online',
    'imap_host': 'secureimap.t-online.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'securesmtp.t-online.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'taupe.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'taupe.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'terra.es': {
    'display_name': 'Correo Terra',
    'display_short_name': 'Terra',
    'imap_host': 'imap4.terra.es',
    'imap_port': '143',
    'imap_security': 'none',
    'smtp_host': 'mailhost.terra.es',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'thinline.cz': {
    'display_name': 'Český hosting',
    'display_short_name': 'Český hosting',
    'imap_host': 'mail.cesky-hosting.cz',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.cesky-hosting.cz',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'tiki.ne.jp': {
    'display_name': 'TikiTikiインターネット',
    'display_short_name': 'TikiTiki',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp-auth.tiki.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'tiscali.cz': {
    'display_name': 'Tiscali',
    'display_short_name': 'Tiscali',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.tiscali.cz',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'wo.cz': {
    'alias': 'tiscali.cz'
  },
  'worldonline.cz': {
    'alias': 'tiscali.cz'
  },
  'worldmail.cz': {
    'alias': 'tiscali.cz'
  },
  'tiscali.it': {
    'display_name': 'Tiscali Italy',
    'display_short_name': 'Tiscali',
    'imap_host': 'imap.tiscali.it',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'imap_authentication': [
      'password-encrypted'
    ],
    'smtp_host': 'smtp.tiscali.it',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS',
    'smtp_restriction': [
      'client-IP-address'
    ]
  },
  'tmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'tmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'toccata.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'toccata.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'topaz.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'topaz.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'trio.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'trio.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'umail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'umail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'uol.com.br': {
    'display_name': 'UOL',
    'display_short_name': 'UOL',
    'imap_host': 'imap.uol.com.br',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtps.uol.com.br',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'verizon.net': {
    'display_name': 'Verizon Online',
    'display_short_name': 'Verizon',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.verizon.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'violet.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'violet.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'virgin.net': {
    'display_name': 'Virgin.net: Virgin Media Mail',
    'display_short_name': 'Virgin.net',
    'imap_host': 'imap4.virgin.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.virgin.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'virginmedia.com': {
    'display_name': 'Virgin Media Mail',
    'display_short_name': 'Virgin Media',
    'imap_host': 'imap.virginmedia.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.virginmedia.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'vm.aikis.or.jp': {
    'display_name': 'aikis',
    'display_short_name': 'aikis',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.aikis.or.jp',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'vmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'vmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'vp.tiki.ne.jp': {
    'display_name': 'TikiTikiインターネット',
    'display_short_name': 'TikiTiki',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'vs.tiki.ne.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'waltz.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'waltz.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'wave.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'wave.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'web.de': {
    'display_name': 'WEB.DE Freemail',
    'display_short_name': 'WEB.DE',
    'imap_host': 'imap.web.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.web.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'webhuset.no': {
    'display_name': 'Webhuset',
    'display_short_name': 'Webhuset',
    'imap_host': 'imap.webhuset.no',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.webhuset.no',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'white.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'white.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'wine.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'wine.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'wmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'wmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'wp.pl': {
    'display_name': 'Poczta Wirtualna Polska',
    'display_short_name': 'Poczta WP',
    'imap_host': 'imap.wp.pl',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.wp.pl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'xmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'xmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'xp.wind.jp': {
    'display_name': '群馬インターネット',
    'display_short_name': 'wind',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'xp.wind.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'xpost.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'xpost.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'xs4all.nl': {
    'display_name': 'XS4All',
    'display_short_name': 'XS4All',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtps.xs4all.nl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'xtra.co.nz': {
    'display_name': 'Yahoo! Mail',
    'display_short_name': 'Yahoo',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'send.xtra.co.nz',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'yahoo.co.jp': {
    'display_name': 'Yahoo! メール',
    'display_short_name': 'Yahoo! メール',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.yahoo.co.jp',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ybb.ne.jp': {
    'display_name': 'Yahoo! BB',
    'display_short_name': 'Yahoo! BB',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ybbsmtp.mail.yahoo.co.jp',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'yeah.net': {
    'display_name': 'yeah.net',
    'display_short_name': 'yeah.net',
    'imap_host': 'imap.yeah.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.yeah.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'yellow.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'yellow.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ymail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ymail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'ypost.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ypost.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'zeelandnet.nl': {
    'display_name': 'ZeelandNet e-mail',
    'display_short_name': 'ZeelandNet',
    'imap_host': 'mail.zeelandnet.nl',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.zeelandnet.nl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'zmail.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'zmail.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  'zoho.com': {
    'display_name': 'Zoho Mail',
    'display_short_name': 'Zoho',
    'imap_host': 'imap.zoho.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.zoho.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'zohomail.com': {
    'alias': 'zoho.com'
  },
  'zpost.plala.or.jp': {
    'display_name': 'ぷらら',
    'display_short_name': 'ぷらら',
    'imap_host': '',
    'imap_port': '',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'zpost.mail.plala.or.jp',
    'smtp_port': '587',
    'smtp_security': 'none'
  },
  '3rdeyedev.com': {
    'imap_host': 'mail.3rdeyedev.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.3rdeyedev.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'alumnos.upm.es': {
    'imap_host': 'correo.alumnos.upm.es',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.upm.es',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'autistici.org': {
    'imap_host': 'mail.autistici.org',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.autistici.org',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ceaaces.gob.ec': {
    'imap_host': 'mail.ceaaces.gob.ec',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.ceaaces.gob.ec',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'correo.ugr.es': {
    'imap_host': 'correo.ugr.es',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'correo.ugr.es',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'daum.net': {
    'imap_host': 'imap.daum.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.daum.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'dianrong.com': {
    'imap_host': 'imap.exmail.qq.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.exmail.qq.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'edgeppe.com': {
    'imap_host': 'mail4.hostingplatform.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail4.hostingplatform.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'ent.uz': {
    'imap_host': 'mail.ent.uz',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.ent.uz',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'fastmail': {
    'imap_host': 'imap.fastmail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.fastmail.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'fastmail.com': {
    'alias': 'fastmail'
  },
  'fastmail.fm': {
    'alias': 'fastmail'
  },
  'foxmail.com': {
    'imap_host': 'imap.qq.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.qq.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'gatech.edu': {
    'imap_host': 'mail.gatech.edu',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.gatech.edu',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'gazeta.pl': {
    'imap_host': 'imap.gazeta.pl',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.gazeta.pl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'gmail': {
    'imap_host': 'imap.gmail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.gmail.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'iCloud.com': {
    'alias': 'icloud'
  },
  'ic.ac.uk': {
    'alias': 'office365'
  },
  'icloud': {
    'imap_host': 'imap.mail.me.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.me.com',
    'smtp_port': 587,
    'smtp_security': 'STARTTLS'
  },
  'iinet.net.au': {
    'imap_host': 'mail.iinet.net.au',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.iinet.net.au',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'interia.pl': {
    'imap_host': 'poczta.interia.pl',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'poczta.interia.pl',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'mail.de': {
    'imap_host': 'imap.mail.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'mailbox.org': {
    'imap_host': 'imap.mailbox.org',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mailbox.org',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'mailoo.org': {
    'imap_host': 'imap.mailoo.org',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mailoo.org',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'naver.com': {
    'imap_host': 'imap.naver.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.naver.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'ntymail.com': {
    'imap_host': 'webmail.ntymail.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'webmail.ntymail.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'nwmlm.com': {
    'imap_host': 'ssl0.ovh.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'ssl0.ovh.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'office365': {
    'imap_host': 'outlook.office365.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.office365.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'openmailbox.org': {
    'imap_host': 'imap.openmailbox.org',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.openmailbox.org',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'optonline.net': {
    'imap_host': 'mail.optonline.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.optonline.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'oracle.com': {
    'imap_host': 'stbeehive.oracle.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'stbeehive.oracle.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'plank.life': {
    'imap_host': 'mail.plank.life',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.plank.life',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'pmczuid.nl': {
    'imap_host': 'mail.pmczuid.nl',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.pmczuid.nl',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'riseup.net': {
    'imap_host': 'mail.riseup.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.riseup.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'rogers.com': {
    'alias': 'yahoo'
  },
  'rub.de': {
    'imap_host': 'mail.ruhr-uni-bochum.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.ruhr-uni-bochum.de',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'runbox.com': {
    'imap_host': 'mail.runbox.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.runbox.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'sapo.pt': {
    'imap_host': 'imap.sapo.pt',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.sapo.pt',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'sent.com': {
    'alias': 'fastmail'
  },
  'serversp.us': {
    'imap_host': '167.114.109.252',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': '167.114.109.252',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'sfu.ca': {
    'imap_host': 'imap.sfu.ca',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mailgate.sfu.ca',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'shaw.ca': {
    'imap_host': 'imap.shaw.ca',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.shaw.ca',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'sjtu.edu.cn': {
    'imap_host': 'mail.sjtu.edu.cn',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.sjtu.edu.cn',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'soverin.net': {
    'imap_host': 'imap.soverin.net',
    'imap_implicit_ssl': false,
    'imap_port': '143',
    'smtp_host': 'smtp.soverin.net',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'student.tuwien.ac.at': {
    'imap_host': 'mail.student.tuwien.ac.at',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'mail.student.tuwien.ac.at',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'suttamagga.it': {
    'imap_host': 'imaps.aruba.it',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtps.aruba.it',
    'smtp_port': '465',
    'smtp_security': 'STARTTLS'
  },
  'telefonica.net': {
    'imap_host': 'imap.telefonica.net',
    'imap_security': 'none',
    'imap_port': '143',
    'smtp_host': 'smtp.telefonica.net',
    'smtp_port': '25',
    'smtp_security': 'none'
  },
  'telenet.be': {
    'imap_host': 'imap.telenet.be',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.telenet.be',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'terra.com': {
    'imap_host': 'imap.terra.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.terra.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'ucsd.edu': {
    'imap_host': 'mail.ucsd.edu',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ucsd.edu',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'ukr.net': {
    'imap_host': 'imap.ukr.net',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.ukr.net',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'uni-bremen.de': {
    'imap_host': 'imap.uni-bremen.de',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.uni-bremen.de',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'uwaterloo.ca': {
    'imap_host': 'mailservices.uwaterloo.ca',
    'imap_security': 'SSL / TLS',
    'imap_port': '993',
    'smtp_host': 'mailservices.uwaterloo.ca',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'watch-out.ca': {
    'imap_host': 'imap.zoho.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.zoho.com',
    'smtp_port': '587',
    'smtp_security': 'STARTTLS'
  },
  'yahoo': {
    'imap_host': 'imap.mail.yahoo.com',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.mail.yahoo.com',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  },
  'yahoo.ca': {
    'alias': 'yahoo'
  },
  'yahoo.co.id': {
    'alias': 'yahoo'
  },
  'yahoo.co.in': {
    'alias': 'yahoo'
  },
  'yahoo.com.hk': {
    'alias': 'yahoo'
  },
  'yahoo.com.tw': {
    'alias': 'yahoo'
  },
  'yahoo.com.vn': {
    'alias': 'yahoo'
  },
  'yahoo.gr': {
    'alias': 'yahoo'
  },
  'yahoo.in': {
    'alias': 'yahoo'
  },
  'yahoo.pl': {
    'alias': 'yahoo'
  },
  'yandex': {
    'imap_host': 'imap.yandex.ru',
    'imap_port': '993',
    'imap_security': 'SSL / TLS',
    'smtp_host': 'smtp.yandex.ru',
    'smtp_port': '465',
    'smtp_security': 'SSL / TLS'
  }
};
