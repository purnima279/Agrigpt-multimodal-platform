import {describe,expect,it} from 'vitest';import {NAV} from './nav';
describe('navigation',()=>{
  it('lists all 20 required pages',()=>expect(NAV).toHaveLength(20));
  it('has unique paths',()=>expect(new Set(NAV.map(n=>n.path)).size).toBe(NAV.length));
  it('restricts admin dashboard to ADMIN',()=>expect(NAV.find(n=>n.path==='/admin')?.roles).toEqual(['ADMIN']));
});
