import { zone } from "src/enums/zone.enum";
import { Olm } from "src/modules/olm/entities/olm.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Olm2740661213798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const olmsData = [
            { zone: zone.A, name: 'Ariana' },
            { zone: zone.A, name: 'Beb Jedid' },
            { zone: zone.A, name: 'Bir Mcherga' },
            { zone: zone.A, name: 'El Manar' },
            { zone: zone.A, name: 'Etudiants FSEG - Tunis' },
            { zone: zone.A, name: 'Fouchena' },
            { zone: zone.A, name: 'Hammam Lif' },
            { zone: zone.A, name: 'Rades' },
            { zone: zone.A, name: 'Sidi Hassine' },
            { zone: zone.A, name: 'Tebourba' },
            { zone: zone.A, name: 'Beb Bhar' },
            { zone: zone.A, name: 'Belvedere' },
            { zone: zone.A, name: 'El Fahs' },
            { zone: zone.A, name: 'Hammam Chatt' },
            { zone: zone.A, name: 'INSAT Tunis' },
            { zone: zone.A, name: 'Leaders Bab Souika' },
            { zone: zone.A, name: 'Monfleury' },
            { zone: zone.A, name: 'Mornaguia' },
            { zone: zone.A, name: 'Oued Ellil' },
            { zone: zone.A, name: 'SMU Tunis' },
            { zone: zone.A, name: 'Dar Chaabene' },
            { zone: zone.A, name: 'El Menzah' },
            { zone: zone.A, name: 'Fondouk djedid' },
            { zone: zone.A, name: 'Grombalia' },
            { zone: zone.A, name: 'Korba' },
            { zone: zone.A, name: 'Maamoura' },
            { zone: zone.A, name: 'Menzel Temime' },
            { zone: zone.A, name: 'Tazarka' },
            { zone: zone.A, name: 'Zawiet El Magaiez' },
            { zone: zone.A, name: 'Beni Khiar' },
            { zone: zone.A, name: 'Challenge Grand Tunis' },
            { zone: zone.A, name: 'El Haouaria' },
            { zone: zone.A, name: 'El Medina' },
            { zone: zone.A, name: 'Hammamet' },
            { zone: zone.A, name: 'Hammem El Ghazez' },
            { zone: zone.A, name: 'Menzel Bouzelfa' },
            { zone: zone.A, name: 'Menzel Horr' },
            { zone: zone.A, name: 'Mutuelle Ville' },
            { zone: zone.A, name: 'Nouvelle Medina' },
            { zone: zone.A, name: 'Bardo' },
            { zone: zone.A, name: 'Carthage' },
            { zone: zone.A, name: 'Innovation El Ghazala' },
            { zone: zone.A, name: 'Jedaida' },
            { zone: zone.A, name: 'Ksar Said' },
            { zone: zone.A, name: 'Manouba' },
            { zone: zone.A, name: 'Montplaisir' },
            { zone: zone.A, name: 'Mourouj' },
            { zone: zone.A, name: 'Nabeul' },
            { zone: zone.A, name: 'TBS El Mourouj' },
            { zone: zone.A, name: 'Bou Argoub' },
            { zone: zone.A, name: 'Centre Urbain nord' },
            { zone: zone.A, name: 'Dar allouche' },
            { zone: zone.A, name: 'ESIAT - Cité El Khadhra' },
            { zone: zone.A, name: 'Khaznadar' },
            { zone: zone.A, name: 'La Marsa' },
            { zone: zone.A, name: 'Soliman' },
            { zone: zone.A, name: 'Zaghouen El Medina' },
            { zone: zone.A, name: 'Zahrouni' },
            { zone: zone.A, name: 'Ariana El Medina' },
            { zone: zone.A, name: 'Ben Arous' },
            { zone: zone.A, name: 'Collège la salle - Tunis' },
            { zone: zone.A, name: 'El Battan' },
            { zone: zone.A, name: 'France Ville' },
            { zone: zone.A, name: 'Ibn Khaldoun' },
            { zone: zone.A, name: 'La Goulette et Kram' },
            { zone: zone.A, name: 'Les Berges du lac' },
            { zone: zone.A, name: 'Zaghouen' },
            { zone: zone.A, name: 'Beni Khalled' },
            { zone: zone.A, name: 'Charguia' },
            { zone: zone.A, name: 'Ezzahra' },
            { zone: zone.A, name: 'Jardins El Mourouj' },
            { zone: zone.A, name: 'Kalaat Andalous' },
            { zone: zone.A, name: 'Kelibia' },
            { zone: zone.A, name: 'La Soukra' },
            { zone: zone.A, name: 'Lafayette Tunis' },
            { zone: zone.A, name: 'Megrine' },
            { zone: zone.A, name: 'Tunis' },
            { zone: zone.B, name: 'EL ALIA' },
            { zone: zone.B, name: 'Beja' },
            { zone: zone.B, name: 'Bizerte' },
            { zone: zone.B, name: 'Bousalem' },
            { zone: zone.B, name: 'Université jendouba' },
            { zone: zone.B, name: 'Zarzouna' },
            { zone: zone.B, name: 'Jendouba' },
            { zone: zone.B, name: 'Ras JEBEL' },
            { zone: zone.B, name: 'Rafraf' },
            { zone: zone.B, name: 'Zouaouine' },
            { zone: zone.B, name: 'Siliana' },
            { zone: zone.B, name: 'Ghardimaou' },
            { zone: zone.B, name: 'Fernana' },
            { zone: zone.B, name: 'Metline' },
            { zone: zone.B, name: 'Menzel Bourguiba' },
            { zone: zone.B, name: 'Menzel Jemil' },
            { zone: zone.B, name: 'Menzel Abderahmen' },
            { zone: zone.B, name: 'Mateur' },
            { zone: zone.C, name: 'Hergla' },
            { zone: zone.C, name: 'Eljem' },
            { zone: zone.C, name: 'Ouardanine' },
            { zone: zone.C, name: 'Hamem Sousse' },
            { zone: zone.C, name: 'mahdia' },
            { zone: zone.C, name: 'sahline' },
            { zone: zone.C, name: 'Khniss' },
            { zone: zone.C, name: 'Enfidha' },
            { zone: zone.C, name: 'Béni Hassen' },
            { zone: zone.C, name: 'Sidi Alouane' },
            { zone: zone.C, name: 'Kalaa Sghira' },
            { zone: zone.C, name: 'Ksour Essef' },
            { zone: zone.C, name: 'Bkelta' },
            { zone: zone.C, name: 'Manzel Hayet' },
            { zone: zone.C, name: 'Monastir' },
            { zone: zone.C, name: 'Manzel Ennour' },
            { zone: zone.C, name: 'Msaken' },
            { zone: zone.C, name: 'Ksar hellal' },
            { zone: zone.C, name: 'Chorbane' },
            { zone: zone.C, name: 'Sousse' },
            { zone: zone.C, name: 'Kalaa kbira' },
            { zone: zone.C, name: 'Maatmeur' },
            { zone: zone.C, name: 'Benanne' },
            { zone: zone.C, name: 'Akouda' },
            { zone: zone.C, name: 'Bouhjar' },
            { zone: zone.C, name: 'Sayada' },
            { zone: zone.C, name: 'Moknine' },
            { zone: zone.C, name: 'Jammel' },
            { zone: zone.C, name: 'Ksibet Mediouni' },
            { zone: zone.C, name: 'Sidi Bouali' },
            { zone: zone.C, name: 'Zaouiet Sousse' },
            { zone: zone.C, name: 'Teboulba' },
            { zone: zone.C, name: 'Bembla' },
            { zone: zone.D, name: 'Sbikha' },
            { zone: zone.D, name: 'Hajeb Layoun' },
            { zone: zone.D, name: 'Tozeur' },
            { zone: zone.D, name: 'Sidi bouzid' },
            { zone: zone.D, name: 'Métlaoui' },
            { zone: zone.D, name: 'Kairouan' },
            { zone: zone.D, name: 'sbeitla' },
            { zone: zone.D, name: 'Manzel mhiri' },
            { zone: zone.D, name: 'Ain Jloula' },
            { zone: zone.D, name: 'El-Guettar' },
            { zone: zone.D, name: 'Gafsa' },
            { zone: zone.E, name: 'Médenine' },
            { zone: zone.E, name: 'DJERBA' },
            { zone: zone.E, name: 'Djerba Midoun' },
            { zone: zone.E, name: 'OLM BIR LAHMER' },
            { zone: zone.E, name: 'Thyna' },
            { zone: zone.E, name: 'Tanyour' },
            { zone: zone.E, name: 'Zarzis' },
            { zone: zone.E, name: 'Ben Guerdane' },
            { zone: zone.E, name: 'Metouia' },
            { zone: zone.E, name: 'Diwan' },
            { zone: zone.E, name: 'Sfax' },
            { zone: zone.E, name: 'Sidi Mansour' },
            { zone: zone.E, name: 'Gabes' },
            { zone: zone.E, name: 'El Hamma' },
            { zone: zone.E, name: 'Sakiet Ezzit' },
            { zone: zone.E, name: 'Djerba ajim' },
            { zone: zone.E, name: 'Ksour tataouine' },
            { zone: zone.E, name: 'Ouedhref' },
            { zone: zone.E, name: 'ENIG Gabes Sud' },
            { zone: zone.E, name: 'Sakiet Eddaier' },
            { zone: zone.E, name: 'Gremda' },
            { zone: zone.E, name: 'Kebili' },
            { zone: zone.E, name: 'Chenini' },
          ];
      
          await queryRunner.manager.insert(Olm, olmsData);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM olm');
    }

}

