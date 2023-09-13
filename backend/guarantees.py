import os
import django

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from restapi.models import CampaignGuarantees  # Assuming CampaignGuarantee is the model for campaign_guarantee

def add_campaign_guarantee_data():
    data = [
        ('276032100011' , 264),
        ('290080700055' , 264),
        ('284090900412' , 264),
        ('289010800351' , 264),
        ('261071900159' , 264),
        ('300052400668' , 264),
        ('292041500279' , 264),
        ('281011701535' , 264),
        ('288121500955' , 264),
        ('287031100013' , 264),
        ('291091601129' , 264),
        ('293032101393' , 264),
        ('292072500378' , 264),
        ('288071500286' , 264),
        ('279070300093' , 264),
        ('258100700029' , 264),
        ('279122701025' , 264),
        ('252092700581' , 264),
        ('288102000146' , 264),
        ('245020400242' , 264),
        ('294062700498' , 264),
        ('298120600056' , 264),
        ('258012100031' , 264),
        ('292020400084' , 264),
        ('265120500089' , 264),
        ('278092500198' , 264),
        ('285061400069' , 264),
        ('281120800102' , 264),
        ('258020100314' , 264),
        ('287062000437' , 264),
        ('267031000903' , 264),
        ('283102600034' , 264),
        ('284100401191' , 264),
        ('288022801613' , 264),
        ('296101301158' , 264),
        ('253011800113' , 264),
        ('263080200081' , 264),
        ('255012200047' , 263),
        ('287011100032' , 263),
        ('289020500344' , 263),
        ('288111801412' , 263),
        ('286042801849' , 263),
        ('290012701363' , 263),
        ('263111900233' , 263),
        ('298060600125' , 263),
        ('291032500491' , 263),
        ('260032600036' , 263),
        ('262020900815' , 263),
        ('260083001009' , 263),
        ('283021500031' , 263),
        ('269082500018' , 263),
        ('262020300027' , 263),
        ('256011200058' , 263),
        ('286061801262' , 263),
        ('300042901135' , 263),
        ('301111500402' , 263),
        ('294031200204' , 263),
        ('295082700174' , 263),
        ('264121800089' , 262),
        ('263090801403' , 262),
        ('266112300129' , 262),
        ('290052601324' , 262),
        ('280110500427' , 262),
        ('297071900583' , 262),
        ('264112000565' , 262),
        ('296080800707' , 262),
        ('291020500363' , 262),
        ('294022100666' , 262),
        ('300051800635' , 262),
        ('266030300045' , 262),
        ('263010600469' , 262),
        ('301011400201' , 262),
        ('278010500777' , 262),
        ('296041001339' , 262),
        ('282062900926' , 262),
        ('289081301613' , 262),
        ('275021500074' , 262),
        ('279040400755' , 262),
        ('293052500447' , 262),
        ('255021700094' , 262),
        ('287120201668' , 262),
        ('270080200087' , 256),
        ('283092000501' , 256),
        ('255020100302' , 256),
        ('274091000169' , 256),
        ('284032100097' , 256),
        ('264030100052' , 256),
        ('283091700338' , 256),
        ('283080600075' , 256),
        ('282071000065' , 256),
        ('292010501156' , 256),
        ('293070900495' , 256),
        ('262092900056' , 256),
        ('299081800622' , 256),
        ('299081800614' , 256),
        ('248092400691' , 256),
        ('292010300661' , 256),
        ('286010100167' , 256),
        ('247061200051' , 256),
        ('283022700158' , 256),
        ('284103101784' , 256),
        ('274072000251' , 256),
        ('296122400585' , 256),
        ('289060401658' , 256),
        ('265090901112' , 256),
        ('282062801573' , 256),
        ('293061700731' , 256),
        ('293061700723' , 256),
        ('282111701721' , 256),
        ('299030500822' , 256),
        ('288022801082' , 256),
        ('258100102862' , 256),
        ('264040401502' , 256),
        ('300072401342' , 256),
        ('287120401678' , 256),
        ('272030600081' , 256),
        ('233020400156' , 256),
        ('283010100155' , 256),
        ('283021400743' , 256),
        ('284090300265' , 256),
        ('284080200105' , 256),
        ('285102600041' , 256),
        ('292081000287' , 256),
        ('286111900753' , 256),
        ('293061300551' , 256),
        ('290112700659' , 256),
        ('282080801139' , 256),
        ('283030502012' , 256),
        ('275120400052' , 256),
        ('284011500198' , 256),
        ('275021200135' , 256),
        ('300073000647' , 256),
        ('279081700164' , 256),
        ('294111000894' , 256),
        ('290022201389' , 256),
        ('297100200819' , 256),
        ('293090501192' , 256),
        ('287070501602' , 256),
        ('275010500036' , 256),
        ('253011600015' , 256),
        ('258113000072' , 256),
        ('282121600027' , 256),
        ('286032501711' , 256),
        ('283051501887' , 256),
        ('287062601144' , 261),
        ('291050100694' , 261),
        ('252012300159' , 261),
        ('286100800554' , 261),
        ('267012900367' , 261),
        ('267072400487' , 261),
        ('258050800645' , 261),
        ('293011000315' , 261),
        ('274071801057' , 261),
        ('271032400759' , 261),
        ('291122200345' , 261),
        ('279043000327' , 261),
        ('287120800484' , 261),
        ('296040600372' , 261),
        ('286120701748' , 261),
        ('286111600507' , 261),
        ('255091301347' , 261),
        ('269010500422' , 260),
        ('272062500018' , 260),
        ('301072500273' , 260),
        ('256103100046' , 260),
        ('289062901496' , 260),
        ('284110600151' , 260),
        ('288012100418' , 259),
        ('283100100247' , 259),
        ('298050100418' , 259),
        ('258022000296' , 259),
        ('285032500589' , 259),
        ('295062801314' , 259),
        ('253093000119' , 259),
        ('283120400351' , 259),
        ('285052300314' , 259),
        ('278032500268' , 259),
        ('290051100907' , 259),
        ('288070700104' , 259),
        ('291120300086' , 259),
        ('289050901288' , 259),
        ('257041400039' , 259),
        ('260111400032' , 259),
        ('256022000238' , 259),
        ('261032200846' , 259),
        ('249030400367' , 259),
        ('283100500101' , 258),
        ('263052900021' , 258),
        ('284030201759' , 258),
        ('276081300722' , 258),
        ('281011000026' , 258),
        ('282041300892' , 258),
        ('281021500032' , 258),
        ('278021100699' , 258),
        ('284012701821' , 257),
        ('271032400425' , 257),
        ('268100700124' , 257),
        ('273010700135' , 257),
        ('300123000531' , 257),
        ('257053000059' , 257),
        ('277010400632' , 257),
        ('301011700132' , 257),
        ('287102100177' , 257),
        ('279062300026' , 257),
        ('297031200013' , 257),
        ('292101201132' , 257),
        ('296082000148' , 257),
        ('267110300912' , 266),
        ('276073000447' , 266),
        ('265061700063' , 256),
        ('294041700843' , 255),
        ('294111900497' , 255),
        ('298061300669' , 255),
        ('296060100308' , 255),
        ('287081800149' , 255),
        ('294072400771' , 255),
        ('289033101027' , 255),
        ('256050401311' , 254),
        ('279091001754' , 254),
        ('259110700254' , 254),
        ('288070700729' , 254),
        ('252011000189' , 254),
        ('258071600167' , 254),
        ('269121500353' , 254),
        ('271081700803' , 254),
        ('282111001602' , 254),
        ('290020600087' , 254),
        ('259072000264' , 254),
        ('297020400079' , 254),
        ('283051200128' , 254),
        ('288091300839' , 254),
        ('296061700305' , 254),
        ('292080300317' , 254),
        ('291030200604' , 254),
        ('264083001832' , 254),
        ('283102401748' , 254),
        ('285120701903' , 254),
        ('280090500103' , 254),
        ('294051200199' , 254),
        ('295070900427' , 254),
        ('291012300185' , 254),
        ('260123000124' , 254),
        ('283051601749' , 254),
        ('291012300652' , 254),
        ('299112000434' , 254),
        ('254031701205' , 254),
        ('295030600577' , 254),
        ('281022200015' , 254),
        ('290090800455' , 254),
        ('264081400127' , 254),
        ('284051101562' , 254),
        ('278081800443' , 254),
        ('287120400202' , 254),
        ('289082901071' , 254),
        ('268082400039' , 254),
        ('270080800082' , 254),
        ('264031200063' , 254),
    ]

    for civil_id, member_id in data:
        # Check if data doesn't already exist in the database to avoid duplicate entries
        if not CampaignGuarantees.objects.filter(civil_id=civil_id, member_id=member_id).exists():
            CampaignGuarantees.objects.create(civil_id=civil_id, member_id=member_id)

if __name__ == "__main__":
    add_campaign_guarantee_data()