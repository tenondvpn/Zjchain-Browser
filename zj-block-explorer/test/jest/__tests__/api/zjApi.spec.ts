import { getAccounts, getInfo, getTransactions, zjApi } from 'src/api/zjApi';
import { getServerIPAddresses } from 'src/utils/sleep';

test('getTransactions', async () => {
    const response = await getTransactions({
        page: 1,
        limit: 2,
    });
    console.log(response.data);
});

test('getTransaction', async () => {
    const response = await zjApi.getTransaction('fc1b39b32036345a26e0a059ecd83faf4525c52a03cff94c5dfebc50e');
    console.log(response);
});

test('getBlock', async () => {
    const response = await zjApi.getBlock('fe62c1212610d16c120275b1d1807255fb3c62a0208cf12803955a82c301840e');
    const jsonObject = JSON.stringify(response);
    console.log(jsonObject);
});
test('getServerIPAddresses',  () => {
    const ip = getServerIPAddresses()?.[0];
    console.log(ip);
});
test('getInfo', async () => {
    const res = await getInfo();
    console.log(res);
});

test('getAccounts', async () => {
    const res = await zjApi.getAccounts({
        page: 1,
        limit: 2,
    });
    console.log(JSON.stringify(res));
});

test('getAccount', async () => {
    const response = await zjApi.getAccount('d9ec5aff3001dece14e1f4a35a39ed506bd6274a');
    const jsonObject = JSON.stringify(response);
    console.log(jsonObject);
});


test('getAccountKeyValues', async () => {
    const response = await zjApi.getAccountKeyValues({
        account:'6500000000000000000000000000000000000000',
    });
    const jsonObject = JSON.stringify(response);
    console.log(jsonObject);
});
